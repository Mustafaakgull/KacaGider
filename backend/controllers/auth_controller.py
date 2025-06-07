from flask import Blueprint, request
from flask_restx import Api, Resource
from werkzeug.security import check_password_hash, generate_password_hash
from models.tables import User
from models.db import db
from controllers.mail_controller import send_verification_mail, verify_code
from controllers.session_controller import create_session, delete_session, get_session_username
from models.redis_client import redis_client

auth_bp = Blueprint('auth_bp', __name__)
api = Api(auth_bp)


@api.route('/register')
class Register(Resource):

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        try:
            send_verification_mail(email)
            return {"message": "verification code sent", "email": email, "username": username,
                    "password": password}, 200
        except Exception as e:
            return {"message": str(e)}, 400


@api.route('/login')
class Login(Resource):

    def post(self):

        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if not user:
            return {"message": "User not found"}, 404

        if check_password_hash(user.password, password):
            res = create_session(username)
            return res
        else:
            return {"message": "Wrong Password"}, 401


@api.route('/logout')
class Logout(Resource):
    def post(self):
        cookie = request.cookies.get('session_id')
        username = get_session_username()
        redis_client.delete(f"session:{cookie}")
        keys = redis_client.keys(f"leaderboard:*")
        for key in keys:
            redis_client.zrem(key, username)
        return {"message": "Logout successful"}, 200


@api.route('/verify')
class Verify(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        code = data.get('code')

        if verify_code(email, code):
            hashed_password = generate_password_hash(password)
            new_user = User(username=username, password=hashed_password, email=email)
            try:
                db.session.add(new_user)
                db.session.commit()
                create_session(username)
                return {"message": "User registered successfully"}, 201
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        else:
            return {"message": "Invalid or expired verification code"}, 400


@api.route('/reset_password')
class ResetPassword(Resource):
    def post(self):
        data = request.get_json()
        username = get_session_username()
        new_password = data.get('new_password')
        User.query.filter_by(username=username).update({"password": generate_password_hash(new_password)})
        db.session.commit()
        return {"message": "Password reset successfully"}, 200


@api.route('/reset_username')
class ResetUsername(Resource):
    def post(self):
        data = request.get_json()
        username = get_session_username()
        new_username = data.get('new_username')
        if User.query.filter_by(username=new_username).first():
            return {"message": "Username already exists"}, 400
        User.query.filter_by(username=username).update({"username": new_username})
        db.session.commit()
        res = create_session(new_username)
        return res

@api.route('/whoami')
class WhoAmI(Resource):
    def post(self):
        session_id = request.cookies.get('session_id')
        print("session_id", session_id)
        if not session_id:
            return {"username": None, "message": "session_id not found"}, 401

        username = redis_client.hget(f"session:{session_id}", "username")
        if username:
            return {"username": username, "session_id": session_id}

        return {"username": None}, 401

@api.route('/contact')
class Contact(Resource):
    def post(self):
        data = request.get_json()
        print(data)
