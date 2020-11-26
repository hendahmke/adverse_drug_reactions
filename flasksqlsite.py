import pandas as pd
from flask import request, Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from io import TextIOWrapper
import csv

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


csv_data = 'raw_data/dummydata.csv'

## SQL database work

class Drug(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    drugname = db.Column(db.String(30), unique=True)
    condition = db.Column(db.String(20), unique=False)
    headache = db.Column(db.Integer, unique=False)
    nausea = db.Column(db.Integer, unique=False)
    dizzy = db.Column(db.Integer, unique=False)
    death = db.Column(db.Integer, unique=False)
    def __repr__(self):
        return '<Drug %r>' % self.drugname

def home():
    if request.method == 'POST':
         csv_file = request.files[csv_data]
         csv_file = TextIOWrapper(csv_file, encoding='utf-8')
         csv_reader = csv.reader(csv_file, delimiter=',')
         # next(csv_reader, None)
         db.create_all()
         for row in csv_reader:
             drug = Drug(drugname=row[0], condition=row[1], headache=row[2], nausea=row[3], dizzy=row[4], death=row[5])
             db.session.add(drug)
             db.session.commit()
    fulldata = db.session.query(Drug).all()
    return render_template('home.html', html_block='html_block', sql=fulldata)


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


