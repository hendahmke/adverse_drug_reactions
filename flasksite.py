import pandas as pd
from flask import request, Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from io import TextIOWrapper
import csv

app = Flask(__name__)

csv_data = 'raw_data/dummydata.csv'



@app.route('/')
@app.route('/home', methods = ['GET', 'POST'])
def home():

    html_block = pd.read_csv(csv_data).to_html()
    return render_template('home.html', html_block=html_block)

@app.route('/data')
def data():
    return render_template('data.html')

if __name__ == '__main__':
    app.run(debug=True)

