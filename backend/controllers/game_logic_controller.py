from backend.models.redis_client import redis_client
from backend.models.db import db
from backend.models.tables import User, House, Vehicle
from backend.controllers.session_controller import create_game_session
# noinspection PyUnresolvedReferences
from flask import make_response, request

SESSION_TIME = 3600
GAME_TIME = 100


def clicked_guess(guessed_price):
    cookie_session = request.cookies.get("session_id")

    user = redis_client.hgetall(f"session:{cookie_session}")

    if int(user["guess_count"]) <= 3:

        redis_client.hincrby(f"session:{cookie_session}", "guess_count", 1)

        # TODO REAL PRICE WILL BE IN ANOTHER REDIS DB THAT COMES FROM SCRAPING
        real_price = redis_client.hget(f"test:car", "price")
        real_price = int(real_price)
        percentage_to_keep = (guessed_price / real_price) * 100
        redis_client.hset(f"guessed_prices:{user['current_room']}_{user['username']}", mapping={f"{user['username']}": guessed_price})
        print(percentage_to_keep)
        print(real_price)
        print(guessed_price)
        print(user)

        if percentage_to_keep < 100:
            return {"message": "successfully guessed", "hint": "You need to guess higher"}, 200
        else:
            return {"message": "successfully guessed", "hint": "You need to guess lower"}, 200

    else:
        return {"message": "maximum number of guesses reached"}, 400


def game_finished(game_session):
    cookie_session = request.cookies.get("session_id")

    user = redis_client.hgetall(f"session:{cookie_session}")
    keys = redis_client.keys(f"guessed_prices:{game_session}:*")
    real_price = redis_client.hget(f"test:car", "price")

    for key in keys:
        _, room, username = key.split(":")
        data = redis_client.hgetall(key)

        # guess count reset
        redis_client.hset(f"session:{cookie_session}", "guess_count", 0)

        if username not in data:
            continue

        guessed_price = int(data[username])
        real_price = int(real_price)

        percentage_to_keep = (guessed_price / real_price) * 100
        leaderboard_key = f"leaderboard:{user['current_room']}"
        redis_client.zadd(leaderboard_key, {username: percentage_to_keep})
        redis_client.hset(key, username, 0)
        print(f"Added {username} with score {percentage_to_keep} to {leaderboard_key}")




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
