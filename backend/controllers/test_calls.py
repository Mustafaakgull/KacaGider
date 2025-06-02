from flask import Blueprint, request
from flask_restx import Api, Resource
from werkzeug.security import check_password_hash, generate_password_hash
from models.tables import User
from models.db import db
from controllers.mail_controller import send_verification_mail, verify_code
from controllers.session_controller import create_session
from models.redis_client import redis_client
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
            code = send_verification_mail(email)
            if verify_code(email, code) :
                db.session.add(new_user)
                db.session.commit()
                return ({"message": "User successfully registered"}), 201
            return None

        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400


@api.route('/login_test')
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

        elif user.password == password:

            return {"message": "Login successful","session_id":f"{create_session(username)}"}, 200

        elif check_password_hash(user.password, password):
            response = create_session(username)
            return {"message": "Login successful","response":f"{response}","response_else":""}, 200
        else:
            return {"message": "Wrong Password"}, 401
@api.route('/session_test')
class session(Resource):
    def get(self):
        # not working right now
        return {
            "message": f"{request.cookies.get('session_id')}",
            "m2": f"{redis_client.get('session:omerke')}"
        }, 200
