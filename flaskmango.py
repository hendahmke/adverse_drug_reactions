from flask import request, Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from forms import DrugQueryForm
import pandas as pd
import csv
import matplotlib.pyplot as plt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'f9f090e11ddd2bae'
import pymongo
from pymongo import MongoClient
client = MongoClient()

# data = {'drug' : ['Tylenol', 'Cialis', 'Ibuprofen', 'Benadril', 'Claritin'],
#        'headache' : [2, 4, 0, 1, 0],
#        'nausea' : [0, 1, 1, 1, 0],
#        'dizzy' : [0, 2, 1, 1, 0],
#        'death' : [1, 0, 1, 2, 20]}


# df = pd.DataFrame(data, columns = data.keys())

db = client['adverse_effects']

df = pd.read_csv('./raw_data/SE_count.csv')

drugs = db['drugs']
db.drugs.drop()
drugs.insert_many(df.T.to_dict().values())




@app.route('/', methods = ['GET', 'POST'])
@app.route('/home', methods = ['GET', 'POST'])
def home():
    #Query the database
    form = DrugQueryForm()
    to_display = drugs.find_one({'drugName' : f'{form.drugname.data}'})



    #Remove zero value counts
    panda = pd.DataFrame(to_display, index = ['drug'])
    panda = panda.drop(columns = ['_id'])
    panda = panda.loc[:, (panda != 0).any(axis=0)]

    #Reset to dictionary for plotting
    fig, ax = plt.subplots()
    row = {}
    for column in panda.columns:
        row[f'{column}'] = panda.loc[panda.index[0],f'{column}']

    #Seperate pairs to be plotted
    group_data = list(row.values())[1:]
    group_names = list(row.keys())[1:]

    ax.barh(group_names, group_data)
    # ax = panda.plot.barh()
    ax.set_xlabel('Total Number')
    ax.set_title('Reported Side Effects')
    plt.style.use('seaborn')
    fig.savefig(f'./static/images/{form.drugname.data.replace(" ", "")}.png')

    #Create table to go above image
    panda = panda.to_html()



    return render_template('home.html', html_block=panda, form=form, image=f'./static/images/{form.drugname.data.replace(" ", "")}.png')

@app.route('/data')
def data():
    return render_template('data.html')



if __name__ == '__main__':
    app.run(debug=True)
