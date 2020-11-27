from flask import request, Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from forms import DrugQuery
import pandas as pd
import csv

app = Flask(__name__)
app.config['SECRET_KEY'] = 'f9f090e11ddd2bae'
import pymongo
from pymongo import MongoClient
client = MongoClient()

data = {'drug' : ['Tylenol', 'Cialis', 'Ibuprofen', 'Benadril', 'Claritin'],
        'condition' : ['pain', 'ed', 'pain', 'allergy', 'allergy'],
       'headache' : [2, 4, 0, 1, 0],
       'nausea' : [0, 1, 1, 1, 0],
       'dizzy' : [0, 2, 1, 1, 0],
       'death' : [1, 0, 1, 2, 20]}


df = pd.DataFrame(data, columns = data.keys())

db = client['adverse_effects']
drugs = db['drugs']
drugs.insert_many(df.T.to_dict().values())



@app.route('/')
@app.route('/home', methods = ['GET', 'POST'])
def home():
    form = DrugQueryForm()
    to_display = drugs.find_one({'drug' : f'{form.drugname}'})
    # html_block = pd.read_csv(csv_data).to_html()
    return render_template('home.html', html_block=to_display)

@app.route('/data')
def data():
    return render_template('data.html')



if __name__ == '__main__':
    app.run(debug=True)
