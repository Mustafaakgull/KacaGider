import time

from flask import Blueprint, request
import requests
from flask_socketio import emit

import controllers.session_controller
from models.tables import User
from models.redis_client import redis_client
from controllers.game_logic_controller import game_finished, room_name_converter, set_all_user_price_zero
from controllers.session_controller import  get_session_username
import controllers.timer
# from helpers import check_password_strength
socketio_bp = Blueprint('socketio_bp', __name__)

# Initialize these as None, will be set later
socketio = None
current_count = 0
current_text = ""


def init_socketio(socketio_instance):
    global socketio
    socketio = socketio_instance
    register_handlers()
    game_handlers()
    chat_handler()
    info_handler()


def register_handlers():
    @socketio.on('check_values')
    def handle_connect(data):

        errors = {}
        has_error = False

        if not data.get("email"):
            errors["email"] = "email is required"
        # can be changed later
        if ("@" and ".") not in data.get("email"):
            errors["email"] = "email is invalid"

        user = User.query.filter_by(username=data.get("username")).first()
        if not data.get("username"):
            errors["username"] = "username is required"
        if user is not None:
            errors["username"] = "username is already taken"

        if not data.get("password"):
            errors["password"] = "password is required"
        if data.get("password") != data["password"]:
            pass

        if has_error:
            emit("registration_response", {"success": False, "errors": has_error})
        else:
            emit("registration_response", {"success": True})


def game_handlers():

    @socketio.on("timer")
    def handle_timer():
        emit("timer_response", controllers.timer.time_sended)

    @socketio.on('guess_button_clicked')
    def clicked_guess(guessed_price):
        # cookie_session = request.cookies.get("session_id")
        response = requests.post("https://api.kacagider.net/whoami")
        data = response.json()
        cookie_session = data.get("session_id")
        user = redis_client.hgetall(f"session:{cookie_session}")
        print("session: ", user)
        test_username = redis_client.hget(f"session:{cookie_session}", "username")
        if int(user["guess_count"]) <= 3:

            redis_client.hincrby(f"session:{cookie_session}", "guess_count", 1)
            real_price = redis_client.hget(f"info:{user['current_room']}", "fiyat")
            proximity = min(int(real_price),int(guessed_price)) / max(int(real_price), int(guessed_price))
            percentage_price = (guessed_price / int(real_price)) * 100
            score = proximity * 1000
            redis_client.hset(f"guessed_prices:{str(user['current_room'])}", test_username, str(guessed_price))
            redis_client.zadd(f"leaderboard_top3:{user['current_room']}", {test_username: score})
            if percentage_price < 100:
                emit("hint_message", "You need to guess higher")
            else:
                emit("hint_message", "You need to guess lower")

        else:
            emit("hint_message", "maximum number of guesses reached")

    @socketio.on("join_room")
    def join_game_session(room_name):
        response = requests.post("https://api.kacagider.net/whoami")
        data = response.json()
        cookie_session = data.get("session_id")
        room_name = room_name_converter(room_name)
        redis_client.hset(f"session:{cookie_session}", "current_room", room_name)
        username = redis_client.hget(f"session:{cookie_session}", "username")


# when user go back to the main page it will probably not revert it back it is a bug
# no just call it again when go back into main page


def info_handler():
    @socketio.on("take_all_data")
    def take_all_data(room_name):
        room_name = room_name_converter(room_name)
        vehicle_data = redis_client.hgetall(f"info:{room_name}")
        photos = redis_client.lrange(f"photos:{room_name}", 0, -1)
        emit("vehicle_data:", {'data': vehicle_data, 'photos': photos})

        leaderboard = redis_client.zrevrange(f"leaderboard:{room_name}", 0, -1, withscores=True)
        leaderboard_data = [{"username": name, "score": int(score)} for name, score in leaderboard]

        emit("leaderboard_data", leaderboard_data)
        leaderboard_top3 = redis_client.zrevrange(f"leaderboard_top3:{room_name}", 0, 2, withscores=True)
        leaderboard_top3_data = [{"username": name, "score": int(score)} for name, score in leaderboard_top3]
        emit("leaderboard_data_top3", leaderboard_top3_data)
        user_count_data = redis_client.hlen(room_name)
        emit("room_user_count", user_count_data)

    @socketio.on("take_vehicle_data")
    def send_vehicle_data(room_name):
        room_name = room_name_converter(room_name)
        data = redis_client.hgetall(f"info:{room_name}")
        photos = redis_client.lrange(f"photos:{room_name}", 0, -1)
        emit("vehicle_data:", {"data": data, "photos": photos})
    #
    # @socketio.on("take_leaderboard_data")
    # def send_leaderboard_data(room_name):
    #     room_name = room_name_converter(room_name)
    #     leaderboard = redis_client.zrevrange(f"leaderboard:{room_name}", 0, -1, withscores=True)
    #     data = [{"username": name, "score": int(score)} for name, score in leaderboard]
    #
    #     emit("leaderboard_data", data)
    #
    # @socketio.on("take_top3_leaderboard_data")
    # def send_top3_from_leaderboard(room_name):
    #     room_name = room_name_converter(room_name)
    #     leaderboard = redis_client.zrevrange(f"leaderboard_top3:{room_name}", 0, 2, withscores=True)
    #     data = [{"username": name, "score": int(score)} for name, score in leaderboard]
    #
    #     emit("leaderboard_data_top3", data)
    #
    # @socketio.on("take_user_count")
    # def send_user_count(room_name):
    #     data = redis_client.hlen(room_name)
    #     emit("room_user_count", data)
    @socketio.on("current_user")
    def current_user():
         response = requests.post("https://api.kacagider.net/whoami")
         data = response.json()
         username = data.get('username')
         if username is None:
             emit("current_user_username", "none")
         else:
            emit("current_user_username", username)


def chat_handler():

    @socketio.on('send_message')
    def handle_message(data):
        response = requests.post("https://api.kacagider.net/whoami")
        data = response.json()
        cookie_session = data.get("session_id")

        username = redis_client.hget(f"session:{cookie_session}", "username")
        message = data.get('message', '')

        emit('receive_message', {
            'username': username,
            'message': message
        }, broadcast=True)
