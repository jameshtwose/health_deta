FROM python:latest

WORKDIR /backend

RUN apt-get update -qq && \
    apt-get install -y git python3-pip build-essential

COPY . /backend
RUN python3 -m pip install -r requirements.txt
RUN uvicorn main:app --reload