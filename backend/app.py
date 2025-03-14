import os
from flask import Flask, session
from flask_session import Session
from models.db import db
from controllers.user_controller import user_bp
from controllers.auth_controller import auth_bp
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root:{os.environ.get("password")}@localhost/kaca_gider'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(debug=True)
