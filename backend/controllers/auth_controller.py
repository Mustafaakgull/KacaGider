from flask import Blueprint, request
from flask_restx import Api, Resource
from werkzeug.security import check_password_hash, generate_password_hash
from backend.models.user import User
from backend.models.db import db
from backend.controllers.mail_controller import send_verification_mail, verify_code

auth_bp = Blueprint('auth_bp', __name__)
api = Api(auth_bp)


@api.route('/register')
class Register(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        try:
            send_verification_mail(email)
            return {"message": "verification code sent"}, 200
        except Exception as e:
            return {"message": str(e)}, 400


@api.route('/login')
class Login(Resource):
    def get(self):
        pass

    def post(self):

        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if not user:
            return {"message": "User not found"}, 404

        if check_password_hash(user.password, password):
            return {"message": "Login successful"}, 200
        else:
            return {"message": "Wrong Password"}, 401


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
        email = data.get('email')
        new_password = data.get('new_password')

        User.query.filter_by(email=email).update({"password": generate_password_hash(new_password)})
        db.session.commit()
        return {"message": "Password reset successfully"}, 200


@api.route('/reset_username')
class ResetUsername(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        new_username = data.get('new_username')

        User.query.filter_by(email=email).update({"username": new_username})
        db.session.commit()
        return {"message": "Username reset successfully"}, 200
