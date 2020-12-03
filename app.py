from os.path import split
from flask import request, Flask, render_template, url_for
from forms import DrugQueryForm
import pandas as pd
import csv
import matplotlib.pyplot as plt
import pickle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'f9f090e11ddd2bae'



drug_list = pickle.load(open("./list_of_drugs.pkl", "rb"))
master_dict = pickle.load(open("./master_dict_perc.pkl", 'rb'))

@app.route('/_autocomplete', methods=['GET'])
def autocomplete():
    return Response(json.dumps(drug_list), mimetype='application/json')

@app.route('/', methods = ['GET', 'POST'])
@app.route('/home', methods = ['GET', 'POST'])
def home():
    #Query the master_dict
    form = DrugQueryForm(request.form)
    if form.drugname.data == '': #Default if no entry yet
        to_display = master_dict['Etonogestrel']
    else:
        to_display = master_dict[f'{form.drugname.data}']

    #Remove zero value counts
    panda = pd.DataFrame(to_display, index = ['drug'])
    panda = panda.drop(columns = ['_id'])
    panda = panda.loc[:, (panda != 0).any(axis=0)]
    panda = panda.rename(columns = {'drugName' : 'drug'})

    #Reset to dictionary for plotting
    fig, ax = plt.subplots()
    row = {}
    for column in panda.columns:
        row[f'{column}'] = panda.loc[panda.index[0],f'{column}']

    #Seperate pairs to be plotted
    group_data = list(row.values())[1:-1]
    group_names = list(row.keys())[1:-1]

    ax.barh(group_names, group_data)
    # ax = panda.plot.barh()
    ax.set_xlabel('Total Number')
    ax.set_title('Percentage of Reviews')
    plt.style.use('seaborn')
    plt.tight_layout()
    if to_display == master_dict['Etonogestrel']:
        fig.savefig('./static/images/Etonogestrel.png')
        image = './static/images/Etonogestrel.png'
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


#get rid of mongo, search a dictionary, run on cloud service, pickled python object

#find_many, loop through database

# -list of drugs
# -find_many with list
# -retrieve all of the dictionaries
# -save all of the files in a pickled (check size < 20 mb)
# -read from pickled file in github
