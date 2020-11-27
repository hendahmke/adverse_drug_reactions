from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField


class DrugQueryForm(FlaskForm):
    drugname = StringField('drugname')
    submit = SubmitField('request')
