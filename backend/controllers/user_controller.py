from flask import Blueprint, jsonify
from flask_restx import Api, Resource
from models.user import User

user_bp = Blueprint('user_bp', __name__)

api = Api(user_bp)


@api.route('/users')
class ListUsers(Resource):
    def get(self):
        users = User.query.all()
        return jsonify({"message": str(users)})

    def post(self):
        pass
