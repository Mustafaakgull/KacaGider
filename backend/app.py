import os
from flask import Flask
from models.db import db
from flask_socketio import SocketIO
from controllers.socketio_controller import socketio_bp, init_socketio
from flask_cors import CORS
from models.redis_client import redis_client
from controllers.scraping import scrape_vehicle
app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*"}})  # geliştirme için
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:incirseverim123@localhost:3306/kaca_gider'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost:3306/kaca_gider'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql://{os.environ.get('MYSQLUSER')}:{os.environ.get('MYSQLPASSWORD')}"
    f"@{os.environ.get('MYSQLHOST')}:{os.environ.get('MYSQLPORT')}/{os.environ.get('MYSQLDATABASE')}"
)
db.init_app(app)

from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from controllers.test_calls import test_call_bp

app.register_blueprint(test_call_bp)
app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(socketio_bp)

init_socketio(socketio)

from controllers.timer import fetch_data_every
fetch_data_every(20)

@app.route("/test-redis")
def test_redis():
    try:
        redis_client.set("testkey", "hello")
        value = redis_client.get("testkey")
        return {"message": value}, 200
    except Exception as e:
        return {"error": str(e)}, 500


if __name__ == '__main__':
    socketio.run(
        app,
        debug=True,
        host='0.0.0.0',  # ✅ tüm dış istekleri dinle
        port=5000,
        use_reloader=False,
        allow_unsafe_werkzeug=True,
    )

