from flask import Flask, session
from backend.models.db import db
from backend.models.tables import User,Vehicle,House

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root:13041998@localhost/kaca_gider'
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
    car1 = Vehicle(type="car",km="100000",transmission="otomatik",fuel_type="benzin",model_year="2020",model_name="honda civic",price="900000")
    motorcycle = Vehicle(type="motorcycle",km="50000",transmission="manuel",fuel_type="benzin",model_year="2022",model_name="bmw",price="500000")
    house = House(city = "istanbul",district="kadikoy",room_count="3+1",square_meter="100m2",building_age = "5",price="8000000")
    db.session.add_all([car1, motorcycle, house, user1, user2, user3])
    db.session.commit()

if __name__ == '_main_':
    app.run(debug=True)