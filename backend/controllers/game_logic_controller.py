from backend.models.redis_client import redis_client
from backend.models.db import db
from backend.models.tables import User, House, Vehicle
from backend.controllers.session_controller import create_game_session
# noinspection PyUnresolvedReferences
from flask import make_response, request

SESSION_TIME = 3600
GAME_TIME = 100


def clicked_guess(guessed_price):
    session_cookie = request.cookies.get("session_id")

    user = redis_client.hgetall(f"session:{session_cookie}")
    user = {k.decode(): v.decode() for k, v in user.items()}

    if int(user["guess_count"]) <= 3:

        redis_client.hincrby(f"session:{session_cookie}", "guess_count", 1)

        real_price = redis_client.hget(f"{user['current_room']}", "price")
        percentage_to_keep = (guessed_price / real_price) * 100
        redis_client.hset(f"guessed_prices:{user['current_room']}", mapping={f"{user['username']}": guessed_price})

        if percentage_to_keep < 100:
            return {"message": "successfully guessed", "hint": "You need to guess higher"}, 200
        else:
            return {"message": "successfully guessed", "hint": "You need to guess lower"}, 200

    else:
        return {"message": "maximum number of guesses reached"}, 400


def game_finished(game_session):
    all_guessed_prices = redis_client.hgetall(f"guessed_prices:{game_session}")
    all_guessed_prices = {k.decode(): v.decode() for k, v in all_guessed_prices.items()}
    for guessed_price in all_guessed_prices:
    #     todo tüm fiyatları al, sonra puanları hesapla hepsini leaderboard a göm

    user = redis_client.hgetall(f"session:{session_cookie}")
    redis_client.zadd(f"leaderboard:{user['current_room']}", {f"{user['username']}": percentage_to_keep})

    pass


def new_games():
    car = Vehicle.query.filter_by(type="car").first()
    car_dict = car.to_dict()
    create_game_session(car)
    redis_client.hset("public_room_car", mapping=car_dict)
    redis_client.expire("public_room_car", SESSION_TIME)

    motorcycle = Vehicle.query.filter_by(type="motorcycle").first()
    motorcycle_dict = motorcycle.to_dict()
    create_game_session(motorcycle)
    redis_client.hset(f"public_room_motorcycle", mapping=motorcycle_dict)
    redis_client.expire("public_room_motorcycle", SESSION_TIME)

    house = House.query.first()
    house_dict = house.to_dict()
    create_game_session(house)
    redis_client.hset(f"public_room_house", mapping=house_dict)
    redis_client.expire("public_room_house", SESSION_TIME)
