from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextField


class DrugQueryForm(FlaskForm):
    drugname = StringField('drugname', id="drug_name_autocomplete")
    submit = SubmitField('request')
