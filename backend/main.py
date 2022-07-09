from fastapi import FastAPI
from deta import Deta
# from dotenv import load_dotenv, find_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
# #%%
# load_dotenv(find_dotenv())

# #%%
# # initialize with a project key
# deta = Deta(os.environ["health_deta_project_key"])

# #%%
# # create the deta Base
# health_db = deta.Base("health_deta_base")

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
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

@app.get("/all")
def read_all():
    return [{'date': '2020-12-31',
  'key': 'z0zocui27zi6',
  'mean_bpm': 89.29,
  'mean_confidence': 1.86},
 {'date': '2021-01-01',
  'key': 'l9krrctsoxx8',
  'mean_bpm': 76.68,
  'mean_confidence': 2.08},
 {'date': '2021-01-02',
  'key': 'rkxjlznt1tk5',
  'mean_bpm': 74.02,
  'mean_confidence': 2.36},
 {'date': '2021-01-03',
  'key': 'pc2njrew5e98',
  'mean_bpm': 81.56,
  'mean_confidence': 2.24},
 {'date': '2021-01-04',
  'key': 'v1sfuj1qi3d5',
  'mean_bpm': 77.08,
  'mean_confidence': 2.16},
 {'date': '2021-01-05',
  'key': '5zlos8waqv63',
  'mean_bpm': 71.87,
  'mean_confidence': 2.33}]
