from flask import Flask, render_template,request, redirect, session, jsonify

from flask_session import Session
app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    user_data = request.get_json()
    print(user_data)
    if not user_data["name"] or not user_data["email"] or not user_data["password"] or not user_data["verifypasswrod"]:
        return jsonify("please fill all fileds")

    return jsonify("noerror")