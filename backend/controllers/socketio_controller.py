from flask import Blueprint, request
from flask_socketio import emit
from backend.models.tables import User
from backend.models.redis_client import redis_client
from backend.controllers.game_logic_controller import clicked_guess, game_finished
from backend.controllers.session_controller import join_game_session
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

    socketio.on('guess_button_clicked')(clicked_guess)
    socketio.on('game_finished')(game_finished)
    @socketio.on("join_game_room")
    def join_game_room(data):
        join_game_session(data)
# when user go back to the main page it will probably not revert it back it is a bug

def info_handler():

    @socketio.on("take_vehicle_data")
    def send_vehicle_data(type):
        data = redis_client.hgetall(f"info:{type}")
        emit("vehicle_data:", data)

    @socketio.on("take_leaderboard_data")
    def send_leaderboard_data():
        leaderboard = redis_client.zrevrange("leaderboard", 0, -1, withscores=True)
        data = [{"username": name, "score": int(score)} for name, score in leaderboard]

        emit("leaderboard_data", data)
    @socketio.on("take_top3_leaderboard_data")
    def send_top3_from_leaderboard():
        leaderboard = redis_client.zrevrange("leaderboard", 0, 3, withscores=True)

        data = [{"username": name, "score": int(score)} for name, score in leaderboard]

        emit("leaderboard_data_top3", data)
    @socketio.on("take_user_count")
    def send_user_count(room):
        data = redis_client.hlen(room)
        emit("room_user_count", data)


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






