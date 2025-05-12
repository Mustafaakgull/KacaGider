from flask import Blueprint, request
from flask_restx import Api, Resource
from werkzeug.security import check_password_hash, generate_password_hash
from backend.models.user import User
from backend.models.db import db
from backend.controllers.mail_controller import send_verification_mail, verify_code
import redis as r
test_call_bp = Blueprint('test_call_bp', __name__)
api = Api(test_call_bp)


# print(check_password_hash("scrypt:32768:8:1$J6fKjSZJxla229Cb$f7b1f22cf106b8748667f6ffc83a964aa2c573d309dc6ec474aeda0e3e82889b749009cc38d7d0adc74370059480cc8e28842e19cea6ad1eb00055d6fa3c266e","1"))


@api.route('/register_test')
class Register(Resource):
    def get(self):
        pass

    def post(self):
        data = request.get_json()

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        hashed_password = generate_password_hash(password)

        new_user = User(username=username, email=email, password=hashed_password)

        try:
            # logic change needed asap
            code = send_verification_mail(email)
            if verify_code(email, code) :
                db.session.add(new_user)
                db.session.commit()
                return ({"message": "User successfully registered"}), 201
            return None

        except Exception as e:
            db.session.rollback()
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
