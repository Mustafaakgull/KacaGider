from flask import Blueprint
from flask_socketio import emit
from backend.models.user import User
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


    @socketio.on('connect')
    def handle_connect():
        emit('update_count', {'count': current_count})
        emit('update_text', {'text': current_text})

    @socketio.on('click')
    def handle_click():
        global current_count
        current_count += 1
        emit('update_count', {'count': current_count}, broadcast=True)

    @socketio.on('text_update')
    def handle_text_update(data):
        global current_text
        current_text = data['text']
        emit('update_text', {'text': current_text}, broadcast=True)