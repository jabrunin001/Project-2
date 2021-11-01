import pandas as pd
import numpy as np
import json

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from scipy import stats

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

db = app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///titles_country_year.sqlite"
app.config['SQLALCHEMY_BINDS'] = {'two' : 'sqlite:///netflix_db.sqlite'}

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
netflix_data = Base.classes.MainNetflix

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

# runs the flask app to get the data for the barchart 

#
@app.route("/barchart") # doing this for the top 20 countries, for every year
def barchart(year, x , y): 
    """Returns the data needed for the linechart."""
    print('This is the data for the ratings information')
    # Use Pandas to perform the sql query
    results = pd.read_sql(f"SELECT rating, country, country_added from MainNetflix where release_year = {year}", db.session.bind)

    # print(results)
    # Return a list of the column names (sample names)
    results = results.to_json(orient='records')
    jsonresults = json.loads(results)
    return jsonify(jsonresults)


#@app.route("/<country>")
#def county2(country):
    #"""Return a list of sample names."""
    # Use Pandas to perform the sql querylscc
    #results = pd.read_sql(f"select Country Produced from ProductionCompany where year = '{release_year} and country = '{County_Produced}'", db.session.bind)
    # print(results)
    # Return a list of the column names (sample names)
    #json1 = results.to_json(orient='records')
    #jsonfiles = json.loads(json1)
    #return jsonify(jsonfiles)


    
#@app.route("/timeseries/")
#def county3(county):
    #"""Return a list of sample names."""
    # Use Pandas to perform the sql querylscc
    #results = pd.read_sql(f"select Close from netflix_titles order by date", db.session.bind)
    # print(results)
    # Return a list of the column names (sample names)
    #json1 = results.to_json(orient='records')
    #jsonfiles = json.loads(json1)
    #return jsonify(jsonfiles)



    # print(results)
    # Return a list of the column names (sample names)
    json1 = results.to_json(orient='records')
    jsonfiles = json.loads(json1)
    return jsonify(jsonfiles)

#@app.route("/map/<variable>/<year>")
#def map_route(variable, year):
    #"""Return a list of sample names."""
    # Use Pandas to perform the sql query
    #results = pd.read_sql(f"select release_year, country from netflix where year = {year}", db.session.bind)
    #if results[f'{variable}'].dtypes == 'int64':
    #    results[f'{variable}'] = results[f'{variable}'].astype(float)
    #results = results.set_index("country")
    #json1 = results.to_json(orient='index')
    #min1 = results[f'{variable}'].min()
    #max1 = results[f'{variable}'].max()
    #jsonfiles = json.loads(json1)
    #jsonfiles['min_max'] = {'min' : min1, "max" : max1}
    #return jsonfiles 

if __name__ == "__main__":
    app.run() 