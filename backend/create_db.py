from flask import Flask, session
from models.db import db
from models.tables import User

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root:@localhost/kaca_gider'
db.init_app(app)

# from controllers.auth_controller import auth_bp
# from controllers.user_controller import user_bp
# app.register_blueprint(user_bp)
# app.register_blueprint(auth_bp)
with app.app_context():
    db.create_all()
    user1 = User(username="mustafa", email="mustafa@gmail.com", password="1234")
    user2 = User(username="omer", email="omer@gmail.com", password="12345")
    user3 = User(username="mmmm", email="mmmm@gmail.com", password="12346")
    db.session.add_all([user1, user2, user3])
    db.session.commit()

if __name__ == '_main_':
    app.run(debug=True)