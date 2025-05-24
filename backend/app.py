from flask import Flask
from backend.models.db import db
from flask_socketio import SocketIO
from controllers.socketio_controller import socketio_bp, init_socketio
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # geliştirme için

socketio = SocketIO(app, cors_allowed_origins="*")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:incirseverim123@localhost:3306/kaca_gider'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:13041998@localhost:3306/kaca_gider'
db.init_app(app)

from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from backend.controllers.test_calls import test_call_bp

app.register_blueprint(test_call_bp)
app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(socketio_bp)

init_socketio(socketio)

# sonra silincek, test için
from backend.models.redis_client import redis_client
import datetime
from controllers.test_game_logic_api import test_game_logic_bp
app.register_blueprint(test_game_logic_bp)
session_id_test ="a1814ab0-f226-4610-bfd8-99d1fc2a2f22"

redis_client.hset(f"session:{session_id_test}" , mapping={
        "username": "testuser123",
        "theme": "dark",
        "guess_count": 0,
        "current_room": "",
        "created_at": str(datetime.datetime.now())
    })
print(session_id_test)
redis_client.hset(f"test:car", mapping={
    "km": 7500,
    "model_name": "audi",
    "model_year": "2022",
    "transmission_type": "otomatik",
    "fuel_type": "benzin",
    "price": 1000000,
})
if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host='127.0.0.1',
        port=5000,
        use_reloader=False,
        allow_unsafe_werkzeug=True,
        )
