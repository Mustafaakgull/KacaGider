from flask import Flask
from backend.models.db import db
from flask_socketio import SocketIO
from controllers.socketio_controller import socketio_bp, init_socketio
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # geliştirme için

socketio = SocketIO(app, cors_allowed_origins="*")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:incirseverim123@localhost:3306/kaca_gider'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:13041998@localhost:3306/kaca_gider'
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
