from flask import Flask, render_template, url_for, redirect, flash, request, send_file, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt
from datetime import datetime

app  = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'thisisasecretkey'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.app_context().push()

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(40), nullable=False, unique=False)
    email = db.Column(db.String(40), nullable=False, unique=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    token = db.Column(db.String(80), nullable=True)

class Asking(db.Model, UserMixin):
    sno = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    asking = db.Column(db.String(200), nullable=False)
    friendlycount = db.Column(db.Integer, nullable=False)

class Anonytext(db.Model, UserMixin):
    sno = db.Column(db.Integer, primary_key=True)
    parentsno = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(20), nullable=False)
    asking = db.Column(db.String(200), nullable=False)
    friendlytext = db.Column(db.String(300), nullable=False)
    myreply = db.Column(db.String(300), nullable=False)

@app.route('/')
def home():
    if current_user.is_authenticated:
        askcount = Asking.query.filter_by(username=current_user.username).count()
        replycount = db.session.query(db.func.sum(Asking.friendlycount)).filter(Asking.username == current_user.username).scalar()

        asks = Asking.query.order_by(Asking.sno.desc()).all()
        replies = Anonytext.query.filter_by(username=current_user.username).order_by(Anonytext.sno.desc()).limit(6).all()
        notseencount = Anonytext.query.filter_by(username=current_user.username, myreply="").count()
        return render_template('user_index.html', asks=asks, replies=replies, askcount=askcount, replycount=replycount, notseencount=notseencount)
    else:
        return render_template('index.html')


@app.route('/guide')
def guide():
    return render_template('guide.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method=='POST':
        username = request.form['username']
        password = request.form['password']
        currentuser = db.session.query(User).filter_by(username=username).scalar()
        if currentuser:
            if bcrypt.check_password_hash(currentuser.password, password):
                login_user(currentuser)
                return redirect('/')
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method=='POST':
        fullname = request.form['fullname']
        email = request.form['username']
        username = request.form['username']
        email = request.form['username']
        checkmail = db.session.query(User).filter_by(username=username).scalar()
        checkuser = db.session.query(User).filter_by(username=username).scalar()
        if checkuser == True:
            print('Please choose another username')
        elif checkmail == True:
            print('Please choose another email')
        else:
            password = request.form['password']
            hashed_password = bcrypt.generate_password_hash(password)
            user = User(fullname=fullname, email=email, username=username, password=hashed_password, token=None)
            db.session.add(user)
            db.session.commit()
            currentuser = db.session.query(User).filter_by(username=username).scalar()
            login_user(currentuser)
            return redirect('/')
        
    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
        askcount = Asking.query.filter_by(username=current_user.username).count()
        replycount = db.session.query(db.func.sum(Asking.friendlycount)).filter(Asking.username == current_user.username).scalar()
        notseencount = Anonytext.query.filter_by(username=current_user.username, myreply="").count()
        return render_template('dashboard.html', askcount=askcount, replycount=replycount, notseencount=notseencount)

@app.route('/headeronlyqolafkjoaifelkafjsedif')
@login_required
def headerfile():
        notseencount = Anonytext.query.filter_by(username=current_user.username, myreply="").count()
        return render_template('header.html', notseencount=notseencount)

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    return render_template('chat.html')

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect('/')

@app.route('/ask', methods=['GET', 'POST'])
@login_required
def ask():
    if request.method=='POST':
        username = current_user.username
        friendlycount = 0
        asking = request.form['asking']
        prompt = Asking(username=username ,asking=asking, friendlycount=friendlycount)
        db.session.add(prompt)
        db.session.commit()
        return redirect(url_for('allquestions'))
        
    return render_template('ask.html')

@app.route('/friendly/<string:username>/<int:sno>', methods=['GET', 'POST'])
def friendly(username, sno):
    if request.method=='POST':
        current_asking = Asking.query.filter_by(sno=sno).first()
        currently_asking = current_asking.asking
        username = username
        parentsno = sno
        friendlytext = request.form['friendlytext']
        myreply = ""
        current_chat = Anonytext(parentsno=parentsno, asking=currently_asking, username=username, friendlytext=friendlytext, myreply=myreply)
        db.session.add(current_chat)
        db.session.commit()

        current_ask = Asking.query.filter_by(sno=sno).first()
        current_ask.friendlycount += 1
        db.session.commit()

        return redirect("/")
    
    current_asking = Asking.query.filter_by(sno=sno).first()
    currently_asking = current_asking.asking
    username = username

    return render_template('friendly.html', prompt=currently_asking, username=username)

@app.route('/reply/<int:sno>', methods=['GET', 'POST'])
def reply(sno):
    if request.method=='POST':
        myreply = request.form['myreply']
        this_chat = Anonytext.query.filter_by(parentsno=sno).first()
        this_chat.myreply = myreply
        db.session.commit()
        return redirect("/")

    return render_template('reply.html')

@app.route('/allchat')
@login_required
def allchat():
    askcount = Asking.query.filter_by(username=current_user.username).count()
    replycount = db.session.query(db.func.sum(Asking.friendlycount)).filter(Asking.username == current_user.username).scalar()

    asks = Asking.query.order_by(Asking.sno.desc()).all()
    replies = Anonytext.query.order_by(Anonytext.sno.desc()).all()
    notseencount = Anonytext.query.filter_by(username=current_user.username, myreply="").count()
    return render_template('allchat.html', asks=asks, replies=replies, askcount=askcount, replycount=replycount, notseencount=notseencount)

@app.route('/allquestions')
@login_required
def allquestions():
    askcount = Asking.query.filter_by(username=current_user.username).count()
    replycount = db.session.query(db.func.sum(Asking.friendlycount)).filter(Asking.username == current_user.username).scalar()
    
    asks = Asking.query.order_by(Asking.sno.desc()).all()
    replies = Anonytext.query.order_by(Anonytext.sno.desc()).all()
    return render_template('allquestions.html', asks=asks, replies=replies, askcount=askcount, replycount=replycount)


@app.route("/image")
def image():
    # Replace "image.jpg" with your image file name
    image = send_file("static/images/sampleimage.jpg")
    response = make_response(image)
    response.headers["Content-Type"] = "image/jpeg"
    response.headers["X-Instagram-Stories-Share-URL"] = "instagram-stories://share"
    return response

@app.route("/test")
def test():
    return render_template('test.html')

@app.route("/aboutdev")
def aboutdev():
    return render_template('aboutdev.html')

@app.route("/sshotpage/<int:psno>/<int:sno>")
def sshotpage(psno, sno):
    asking = Asking.query.filter_by(sno=psno).first().asking
    friendlytext = Anonytext.query.filter_by(sno=sno).first().friendlytext
    myreply = Anonytext.query.filter_by(sno=sno).first().myreply
    return render_template('sshotpage.html', asking=asking, friendlytext=friendlytext, myreply=myreply)

@app.route("/openchat/<int:psno>/<int:sno>", methods=['GET', 'POST'])
@login_required
def openchat(psno, sno):
    asking = Asking.query.filter_by(sno=psno).first().asking
    friendlytext = Anonytext.query.filter_by(sno=sno).first().friendlytext
    myreply = Anonytext.query.filter_by(sno=sno).first().myreply
    username = Anonytext.query.filter_by(sno=sno).first().username
    
    if request.method == 'POST':
        yourreply = request.form['yourreply']
        this_chat = Anonytext.query.filter_by(sno=sno).first()
        this_chat.myreply = yourreply
        db.session.commit()
        return redirect(f'/openchat/{psno}/{sno}')

    return render_template('openchat.html', psno=psno, sno=sno, asking=asking, friendlytext=friendlytext, myreply=myreply, username=username)

@app.route("/aboutdevalt")
def aboutdevalt():
    return render_template('mydesigndev.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')