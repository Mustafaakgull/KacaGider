from backend.models.db import db


# class User(database.Model):
#     id = database.Column(database.Integer, primary_key=True)
#     username = database.Column(database.String(100), unique=True, nullable=False)
#     email = database.Column(database.String(100), unique=True, nullable=False)
#     password = database.Column(database.String(100), nullable=False, )
#     extend_existing = True

# def __repr__(self):
#     return f"<User {self.username}>"
class User(db.Model):
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

class Vehicle(db.Model):
    __tablename__ = 'vehicle'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)
    km = db.Column(db.String(100), nullable=False)
    transmission = db.Column(db.String(100), nullable=False)
    fuel_type = db.Column(db.String(100), nullable=False)
    model_year = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "km": self.km,
            "transmission": self.transmission,
            "fuel_type": self.fuel_type,
            "model_year": self.model_year
        }

class House(db.Model):
    __tablename__ = 'house'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    room_count = db.Column(db.String(100), nullable=False)
    square_meter = db.Column(db.String(100), nullable=False)
    building_age = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "city": self.city,
            "district": self.district,
            "room_count": self.room_count,
            "square_meter": self.square_meter,
            "building_age": self.building_age
        }