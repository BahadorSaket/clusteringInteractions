
import os
from flask import Flask
from flask import stream_with_context, Response, current_app,send_from_directory, request, jsonify, abort
import csv

app = Flask(__name__)

@app.route("/ping")
def isOnline():
    return "Server Online."


@app.route("/")
def loadIndex():
    return send_from_directory("../","index.html")


@app.route("/getAllData")
def getAllData():
    infile =  open("data.csv")
    def generate():
        for line in infile:
             yield str(line)
    return Response(stream_with_context(generate()))

@app.route('/frontend/<path:path>')
def send_frontend(path):
    return send_from_directory('../frontend', path)
	#return str(rules.getMatchedRules(["348831","89362005"]))

if __name__ == "__main__":
	app.run()
