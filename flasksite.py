
"""
Imports
"""

import pandas as pd # DataFrame Manipulation Package
import numpy as np
import matplotlib.pyplot as plt

from sklearn.feature_extraction.text import TfidfVectorizer # Convert a collection of raw documents to a matrix of TF-IDF features
from sklearn.decomposition import LatentDirichletAllocation # Latent Dirichlet Allocation is a topic model that is used for discovering abstract topics from a collection of documents (variational Bayes algorithm)
from sklearn.feature_extraction.text import CountVectorizer # Convert a collection of text documents to a matrix of token counts

from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.naive_bayes import MultinomialNB # The multinomial Naive Bayes classifier is suitable for classification with discrete features (e.g., word counts for text classification)

import string # Collection of string operations
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer #Lemmatize using WordNet's built-in morphy function. Returns the input word unchanged if it cannot be found in WordNet.
from nltk import word_tokenize

from nltk.sentiment.util import mark_negation

import nltk

from flask import request, Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from forms import DrugQuery
import csv


nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')


app = Flask(__name__)
app.config['SECRET_KEY'] = 'f9f090e11ddd2bae'

"""
Functions
"""

stop_words = set(stopwords.words('english'))

NEGATIONS = ["no", "not", "shouldn't", "aren't", "couldn't", "didn't", "doesn't", "don't", "wasn't", "weren't", "wouldn't", "nor"]

NEW_WORDS = ['mg', "month", "year", "day", "week", "time", "im", "ive", "hour"]

for negation in NEGATIONS:
    stop_words.remove(negation)

for new_word in NEW_WORDS:
    stop_words.add(new_word)

def to_list(x):
    list_words = x.split(' ')
    return list_words

def to_string(x):
    string = " ".join(x)
    return string

#===============================================================

def punctuation(x):
    for punctuation in string.punctuation:
        x =  x.replace(punctuation, '')
    return x.lower()

def remove_numbers (x):
    words_only = ''.join([i for i in x if not i.isdigit()])
    return words_only

def m_negation(x):
    tokenized = word_tokenize(x)
    without_stopwords = [word for word in tokenized if not word in stop_words]
    tokenized_neg = mark_negation(without_stopwords)
    return tokenized_neg

def remove_stopwords(x):
    tokenized = word_tokenize(x)
    without_stopwords = [word for word in tokenized if not word in stop_words]
    return without_stopwords

def lemmatize_review(x):
    lemma = WordNetLemmatizer()
    lista = []
    for w in x:
       lista.append(lemma.lemmatize(w))
    return lista

#===============================================================

def count_words(x):
    wordfreq = []
    for w in x:
        wordfreq.append(x.count(w))
    return dict(zip(x, wordfreq))

def total_count(x):
    total_count = {}
    for row in x:
        for key in row.keys():
          if key in total_count:
              total_count[key] += 1
          else:
              total_count[key] = 1
    return pd.DataFrame(sorted(total_count.items(), key=lambda x: x[1], reverse=True)).head(30).T

def round_two(x):
    return str(int(round(x, 2) * 100)) + "%"

def one_or_zero(x):
    # Makes the prediction a binary outpur
    if x > 0.5:
        x = 1
    else:
        x = 0
    return x

#===============================================================

def print_topics(model, vectorizer):
    for idx, topic in enumerate(model.components_):
        print("Topic %d:" % (idx))
        print([(vectorizer.get_feature_names()[i], round(topic[i], 2))
                        for i in topic.argsort()[:-10 - 1:-1]])


"""
Data
"""

# manual = pd.read_csv('manually_labelled_data.csv')
manual = pd.read_csv("raw_data/manually_labelled_data.csv")

manual = manual.drop(["uniqueID", "drugName", "condition", "date", "rating", "usefulCount"], axis = 1)

manual["clean_review"] = manual["review"].apply(punctuation)
manual['clean_review'] = manual.clean_review.apply(remove_numbers)
manual['clean_review_lst'] = manual.clean_review.apply(to_list)

manual["NonStopwords_review_lst"] = manual.clean_review.apply(remove_stopwords)
manual["NonStopwords_review_str"] = manual.NonStopwords_review_lst.apply(to_string)

manual["NonStopwords_review_lst_MN"] = manual.clean_review.apply(m_negation)
manual["NonStopwords_review_str_MN"] = manual.NonStopwords_review_lst_MN.apply(to_string)

manual["Lemmatized_review_lst"] = manual.NonStopwords_review_lst_MN.apply(lemmatize_review)
manual["Lemmatized_review_str"] = manual.Lemmatized_review_lst.apply(to_string)

manual["Lemmatized_review_list"] = manual.NonStopwords_review_lst.apply(lemmatize_review)
manual["Lemmatized_review"] = manual.Lemmatized_review_list.apply(to_string)
manual["Lemmatized_review_list"] = manual.Lemmatized_review.apply(remove_stopwords)
manual["Lemmatized_review"] = manual.Lemmatized_review_list.apply(to_string)

# manaul['filered_column_by_se'] = 'juan.jack'
# manual['seperating by reviews_length'] = 'hendrike'
# manual['seperating by reviews_score'] = 'peter'



manual["words_count"] = manual.Lemmatized_review_list.apply(count_words)

X = manual["Lemmatized_review_str"]

y = manual["sideEffect"]

# # How many drugs the DF mentions
# drugs = pd.DataFrame(manual["drugName"].value_counts()).head(14).T
# drugs.to_csv('drug_mentions.csv')

# # How many conditions the DF mentions
# conditions = pd.DataFrame(manual["condition"].value_counts()).head(14).T
# conditions.to_csv('condition_mentions.csv')

manual = manual.drop(["clean_review", "clean_review_lst", "NonStopwords_review_lst", "NonStopwords_review_str"], axis = 1)

"""
TF-IDF features | Latent Dirichlet allocation
"""

vectorizer = TfidfVectorizer(min_df = 5,
                             max_df = 1000,
                             max_features = None,
                             vocabulary = None,
                             ngram_range = (1, 3)).fit(manual["Lemmatized_review"]) #

# MINDF Ignore terms that have a document frequency strictly higher than the given threshold
# MAXDF When building the vocabulary ignore terms that have a document frequency strictly lower than the given threshold

data_vectorized = vectorizer.transform(manual["Lemmatized_review"]) #

lda_model = LatentDirichletAllocation(n_components = 2,
                                      learning_method = 'online',
                                      random_state = 29,
                                      #batch_size = 128,
                                      learning_decay = 0.5,
                                      learning_offset = 5,
                                      #evaluate_every = -1,
                                      verbose = 0,
                                      max_iter = 50).fit(data_vectorized)

vocab = vectorizer.get_feature_names()

# iterates over the reviews and predict

predictions = []
for review in manual["Lemmatized_review"]:
    vectorized = vectorizer.transform([review])
    lda_vectors = predictions.append(lda_model.transform(vectorized))

predictions = np.concatenate(predictions, axis=0)

# comparison DataFrame

compare_data = pd.DataFrame(predictions, columns = ["Side_Effect", "No_Side_Effect"])

length = len(predictions)

"""
Output Engineering
"""

compare_data["Manually_Labelled"] = manual["sideEffect"] # Brings a column from the other DataFrame

compare_data["Prediction"] = compare_data.Side_Effect.apply(one_or_zero) # Applies the binary output
compare_data["No_Side_Effect_%"] = compare_data.No_Side_Effect.apply(round_two) # Applies a format
compare_data["Side_Effect_%"] = compare_data.Side_Effect.apply(round_two) # Applies a format

compare_data["bool"] = np.where(compare_data["Manually_Labelled"] == compare_data["Prediction"], True, False) # Compares betwen the precdiction and the label

compare_data.drop(["Side_Effect", "No_Side_Effect"], axis = 1)

# exports the data

compare_data.to_csv('compare_data.csv')


"""
Putting the created csv into html.
"""

csv_data = 'compare_data.csv'

# import pymongo
# from pymongo import MongoClient
# client = MongoClient()

data = {'drug' : ['Tylenol', 'Cialis', 'Ibuprofen', 'Benadril', 'Claritin'],
        'condition' : ['pain', 'ed', 'pain', 'allergy', 'allergy'],
       'headache' : [2, 4, 0, 1, 0],
       'nausea' : [0, 1, 1, 1, 0],
       'dizzy' : [0, 2, 1, 1, 0],
       'death' : [1, 0, 1, 2, 20]}

df = pd.DataFrame(data, columns = data.keys())
df = df.T.to_dict().values()
# drugs.insert_many(df.T.to_dict().values())
# db = client['adverse_effects']
# drugs = db['drugs']


@app.route('/')
@app.route('/home', methods = ['GET', 'POST'])
def home():
    # form = DrugQuery()
    # to_display = drugs.find_one({'drug' : f'{form.drugname}'})
    # html_block = df.to_html()
    return render_template('home.html', html_block=df)

@app.route('/data')
def data():
    return render_template('data.html')



if __name__ == '__main__':
    app.run(debug=True)

