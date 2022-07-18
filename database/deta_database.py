#%%
# read in necessary functions
from deta import Deta
import numpy as np
import pandas as pd
from dotenv import load_dotenv, find_dotenv
import os
import seaborn as sns
#%%
load_dotenv(find_dotenv())

#%%
# initialize with a project key
deta = Deta(os.environ["health_deta_project_key"])

#%%
# create the deta Base
health_db = deta.Base("health_deta_base")

# %%
# Upload health data from an open repository
_df = pd.read_csv("https://raw.githubusercontent.com/jameshtwose/jms_fitbit_analyses/eda/DS/MyFitbitData/JamesTwose/Physical%20Activity/heart_rate_per_hour.csv")
df = (_df
 .assign(**{"date": lambda d: pd.to_datetime(d["dateTime"]).dt.date.astype(str)})
 .groupby("date")
 .mean()
 .round(2)
 .reset_index()
 .rename(columns={"bpm": "mean_bpm", "confidence": "mean_confidence"})
 )
# %%
inserted_values = [health_db.insert(data=row_to_insert) for row_to_insert in df.to_dict(orient="records")]
# inserted_values
# %%
# Fetch data and reassign data types/ drop default key column
df = (pd.DataFrame(health_db.fetch().items)
 .assign(**{"date": lambda d: pd.to_datetime(d["date"]).dt.date})
 .drop("key", axis=1)
 .sort_values(by="date")
 .reset_index(drop=True)
 )
# %%
plot_df = df.melt(id_vars="date")
_ = sns.relplot(data=plot_df, x="date", y="value", hue="variable",
                row="variable", facet_kws={"sharey":False},
                kind="line", aspect=2.5)
# %%
df.head(2).to_json(orient="records")
# %%
