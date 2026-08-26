from flask import Flask, render_template,request, redirect, session, jsonify

from helper import login_required

from flask_session import Session
app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
    if session.get("user_id") is not None:
        return render_template("homepage.html")
    return render_template("index.html")

@app.route("/login", methods=["GET" , "POST"])
def login():
    if request.method == "POST":
        user_data = request.get_json()
        if not user_data["name"] or not user_data["email"] or not user_data["password"] or not user_data["verifypasswrod"]:
            return jsonify("please fill all fileds")
        session["user_id"] = 1
        return jsonify({
            "redirect": "True",
            "location": "/homepage"
        })

    return render_template("index.html")

@app.route("/homepage", methods=["GET", "POST"])
@login_required
def homepage():
    return render_template("homepage.html")