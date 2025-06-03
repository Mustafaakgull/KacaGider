from flask import Blueprint, request
import requests
from flask_socketio import emit

import backend.controllers.session_controller
from backend.models.tables import User
from backend.models.redis_client import redis_client
from backend.controllers.game_logic_controller import game_finished, room_name_converter, set_all_user_price_zero
from backend.controllers.session_controller import  get_session_username
from backend.controllers.scraping import scrape_vehicle
# from backend.helpers import check_password_strength
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

    @socketio.on('guess_button_clicked')
    def clicked_guess(guessed_price):
        # cookie_session = request.cookies.get("session_id")
        cookie_session = backend.controllers.session_controller.session_id_global
        print("global sesion", cookie_session)
        user = redis_client.hgetall(f"session:{cookie_session}")
        print("user", user)
        if int(user["guess_count"]) <= 3:

            redis_client.hincrby(f"session:{cookie_session}", "guess_count", 1)
            real_price = redis_client.hget(f"info:{user['current_room']}", "fiyat")
            print("user current room", user["current_room"])
            print("realş", real_price)
            percentage_price = (guessed_price / int(real_price)) * 100
            print("user current room", user["current_room"])
            print("user username", user["username"])
            print("guessed price", guessed_price)
            redis_client.hset(f"guessed_prices:{str(user['current_room'])}", user['username'], str(guessed_price))

            if percentage_price < 100:
                emit("hint_message", "You need to guess higher")
            else:
                emit("hint_message", "You need to guess lower")

        else:
            emit("hint_message", "maximum number of guesses reached")

    @socketio.on('game_finished')
    def games_finished():
        game_finished()
        cookie_session = backend.controllers.session_controller.session_id_global
        leaderboard = redis_client.zrevrange(f"leaderboard:{redis_client.hget(f'session:{cookie_session}', "current_room")}", 0, -1, withscores=True)
        data = [{"username": name, "score": int(score)} for name, score in leaderboard]

        print("leaderboard data game finished", data)
        scrape_vehicle()

    @socketio.on("join_room")
    def join_game_session(room_name):
        cookie_session = backend.controllers.session_controller.session_id_global
        room_name = room_name_converter(room_name)
        print("user before join", redis_client.hgetall(f"session:{cookie_session}"))
        redis_client.hset(f"session:{cookie_session}", "current_room", room_name)
        username = redis_client.hget(f"session:{cookie_session}", "username")
        print("user after join", redis_client.hgetall(f"session:{cookie_session}"))


# when user go back to the main page it will probably not revert it back it is a bug
# no just call it again when go back into main page


def info_handler():

    @socketio.on("take_vehicle_data")
    def send_vehicle_data(room_name):
        room_name = room_name_converter(room_name)
        data = redis_client.hgetall(f"info:{room_name}")
        photos = redis_client.lrange(f"photos:{room_name}", 0, -1)
        emit("vehicle_data:", {"data": data, "photos": photos})
        print("vehicle_data:", data)

    @socketio.on("take_leaderboard_data")
    def send_leaderboard_data(room_name):
        room_name = room_name_converter(room_name)
        leaderboard = redis_client.zrevrange(f"leaderboard:{room_name}", 0, -1, withscores=True)
        data = [{"username": name, "score": int(score)} for name, score in leaderboard]

        emit("leaderboard_data", data)
        print("leaderboard_data: TAKEN SENDED", data)

    @socketio.on("take_top3_leaderboard_data")
    def send_top3_from_leaderboard(room_name):
        room_name = room_name_converter(room_name)
        leaderboard = redis_client.zrevrange(f"leaderboard_top3:{room_name}", 0, -1, withscores=True)
        data = [{"username": name, "score": int(score)} for name, score in leaderboard]

        emit("leaderboard_data_top3", data)
        print("leaderboard_data_top3:", data)

    @socketio.on("take_user_count")
    def send_user_count(room_name):
        data = redis_client.hlen(room_name)
        emit("room_user_count", data)
        print("room_user_count:", data)


def chat_handler():
    @socketio.on('connect')
    def handle_connect():
        session_id = request.cookies.get('session_id')
        print("ses", session_id)
        print('Client connected')

    @socketio.on('disconnect')
    def handle_disconnect():
        print('Client disconnected')

    @socketio.on('send_message')
    def handle_message(data):
        cookie_session = backend.controllers.session_controller.session_id_global
        print("cookie_session:", cookie_session)
        username = redis_client.hget(f"session:{cookie_session}", "username")
        print("username:", username)
        message = data.get('message', '')

        emit('receive_message', {
            'username': username,
            'message': message
        }, broadcast=True)
