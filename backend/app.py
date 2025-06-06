from flask import Flask
from models.db import db
from flask_socketio import SocketIO
from controllers.socketio_controller import socketio_bp, init_socketio
from flask_cors import CORS
from controllers.scraping import scrape_vehicle
from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
# from controllers.test_calls import test_call_bp
from controllers.timer import fetch_data_every
import os
app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*"}})  # geliştirme için
CORS(app, supports_credentials=True, origins=["https://app.kacagider.net/"])

socketio = SocketIO(app, cors_allowed_origins=[
    "https://app.kacagider.net"
], async_mode="eventlet")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql://{os.environ.get('MYSQLUSER')}:{os.environ.get('MYSQLPASSWORD')}"
    f"@{os.environ.get('MYSQLHOST')}:{os.environ.get('MYSQLPORT')}/{os.environ.get('MYSQLDATABASE')}"
)
db.init_app(app)


# app.register_blueprint(test_call_bp)
app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(socketio_bp)

init_socketio(socketio)

fetch_data_every(20, 5)
