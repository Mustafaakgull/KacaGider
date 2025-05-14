import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from flask import Flask
from backend.models.db import db
from flask_migrate import Migrate
from flask_socketio import SocketIO
from controllers.socketio_controller import socketio_bp, init_socketio

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:incirseverim123@localhost:3306/kaca_gider'
db.init_app(app)
migrate = Migrate(app, db)

from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from controllers.test_calls import test_call_bp

app.register_blueprint(test_call_bp)
app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(socketio_bp)

init_socketio(socketio)

if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host='127.0.0.1',
        port=5000,
        use_reloader=False,
        allow_unsafe_werkzeug=True)
