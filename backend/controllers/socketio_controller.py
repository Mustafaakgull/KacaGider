from flask import Blueprint, request
from flask_socketio import emit
from backend.models.tables import User
from backend.models.redis_client import redis_client
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

    SESSION_TIME = 3600
    GAME_TIME = 100

    @socketio.on('guess_button_clicked')
    def clicked_guess(guessed_price):
        cookie_session = request.cookies.get("session_id")

        user = redis_client.hgetall(f"session:{cookie_session}")

        if int(user["guess_count"]) <= 3:

            redis_client.hincrby(f"session:{cookie_session}", "guess_count", 1)

            # TODO REAL PRICE WILL BE IN ANOTHER REDIS DB THAT COMES FROM SCRAPING
            real_price = redis_client.hget(f"test:car", "price")
            percentage_to_keep = (guessed_price / real_price) * 100
            redis_client.hset(f"guessed_prices:{user['current_room']}_{user['username']}",
                              mapping={f"{user['username']}": guessed_price})

            if percentage_to_keep < 100:
                return {"message": "successfully guessed", "hint": "You need to guess higher"}, 200
            else:
                return {"message": "successfully guessed", "hint": "You need to guess lower"}, 200

        else:
            return {"message": "maximum number of guesses reached"}, 400

    @socketio.on('guess_button_clicked')
    def game_finished(game_session):

        cookie_session = request.cookies.get("session_id")
        user = redis_client.hgetall(f"session:{cookie_session}")
        keys = redis_client.keys(f"guessed_prices:{game_session}:*")
        real_price = redis_client.hget(f"test:car", "price")

        for key in keys:
            _, room, username = key.split(":")
            data = redis_client.hgetall(key)

            # guess count reset
            redis_client.hset(f"session:{cookie_session}", "guess_count", 0)

            if username not in data:
                continue

            guessed_price = int(data[username])

            percentage_to_keep = (guessed_price / real_price) * 100
            leaderboard_key = f"leaderboard:{user['current_room']}"
            redis_client.zadd(leaderboard_key, {username: percentage_to_keep})
            redis_client.hset(key, username, 0)
            print(f"Added {username} with score {percentage_to_keep} to {leaderboard_key}")


def chat_handler():
    @socketio.on('connect')
    def handle_connect():
        print('Client connected')

    @socketio.on('disconnect')
    def handle_disconnect():
        print('Client disconnected')

    @socketio.on('send_message')
    def handle_message(data):
        username = redis_client.hget(f"session:{request.cookies.get('session_id')}", "username")
        message = data.get('message', '')

        emit('receive_message', {
            'username': username,
            'message': message
        }, broadcast=True)






