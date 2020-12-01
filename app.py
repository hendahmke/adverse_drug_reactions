from os.path import split
from flask import request, Flask, render_template, url_for
from forms import DrugQueryForm
import pandas as pd
import csv
import matplotlib.pyplot as plt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'f9f090e11ddd2bae'
import pymongo
from pymongo import MongoClient
client = MongoClient()



db = client['adverse_effects']

df = pd.read_csv('categorical_se.csv')
drugs = db['drugs']
db.drugs.drop()
drugs.insert_many(df.T.to_dict().values())

#This is an empty commit


@app.route('/', methods = ['GET', 'POST'])
@app.route('/home', methods = ['GET', 'POST'])
def home():
    #Query the database
    form = DrugQueryForm()
    to_display = drugs.find_one({'drugName' : f'{form.drugname.data}'})
    if to_display == None: #Default if no entry yet
        to_display = drugs.find_one({'drugName' : 'Abatacept'})

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
    if to_display == drugs.find_one({'drugName' : 'Abatacept'}):
        fig.savefig('./static/images/Abatacept.png')
        image = './static/images/Abatacept.png'
    else:
        fig.savefig(f'./static/images/{form.drugname.data.replace(" ", "")}.png')
        image = f'./static/images/{form.drugname.data.replace(" ", "")}.png'
    #Create table to go above image
    panda = panda.to_html(index = False)



    return render_template('home.html', html_block=panda, form=form, image=image)

@app.route('/about')
def data():
    return render_template('data.html')



if __name__ == '__main__':
    app.run()
