from flask import Blueprint, jsonify
from flask_restx import Api, Resource
from backend.models.user  import User

user_bp = Blueprint('user_bp', __name__)

api = Api(user_bp)


@api.route('/users')
class ListUsers(Resource):
    def get(self):
        users = User.query.all()
        user_dicts = [user.to_dict() for user in users]

        return jsonify({"message": user_dicts})


    def post(self):
        pass
