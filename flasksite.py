import pandas as pd
from flask import Flask, render_template
from flask_alchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

# df = pd.read_csv('raw_data/dummydata.csv')
# html = df.to_html()

class Drug(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    drugname = db.Column(db.String(30), unique=True)
    condition = db.Column(db.String(20), unique=False)
    headache = db.Column(db.Integer, unique=False)
    nausea = db.Column(db.Integer, unique=False)
    dizzy = db.Column(db.Integer, unique=False)
    death = db.Column(db.Integer, unique=False)

@app.route('/')
@app.route('/home')
def home():
    if request.method == 'POST':
        csv_file = request.files['raw_data/dummydata.csv']
        csv_file = TextIOWrapper(csv_file, encoding='utf-8')
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            drug = Drug(drugname=row[0], condition=row[1], headache=row[2], nausea=row[3], dizzy=row[4], death=row[5])
            db.session.add(drug)
            db.session.commit()
    return render_template('home.html')

@app.route('/data')
def data():
    return render_template('data.html')

if __name__ == '__main__':
    app.run(debug=True)
