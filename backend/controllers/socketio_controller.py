from flask import Blueprint
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
    def handle_guess_button_clicked(data):
#         assuming data is price and user
#         redis_client.
        pass


