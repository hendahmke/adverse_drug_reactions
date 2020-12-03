from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextField


class DrugQueryForm(FlaskForm):
    drugname = StringField('Drug Name', id="drug_name_autocomplete")
    submit = SubmitField('request')
