from fastapi import FastAPI
from deta import Deta
from dotenv import load_dotenv, find_dotenv
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware
#%%
load_dotenv(find_dotenv())

#%%
# initialize with a project key
# deta = Deta(os.environ["health_deta_project_key"])
deta = Deta(os.getenv("health_deta_project_key"))

#%%
# create the deta Base
health_db = deta.Base("health_deta_base")

app = FastAPI()

origins = [
    "http://127.0.0.1:5500/docs/index.html",
    "https://jameshtwose.github.io/health_deta/",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "welcome"}


@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

@app.get("/all")
def read_all():
    df = (pd.DataFrame(health_db.fetch().items)
        .assign(**{"date": lambda d: pd.to_datetime(d["date"]).dt.date})
        .drop("key", axis=1)
        .sort_values(by="date")
        .reset_index(drop=True)
        )
    return df.to_dict(orient="records")
