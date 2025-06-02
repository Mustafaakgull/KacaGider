from backend.models.redis_client import redis_client
from backend.controllers.session_controller import create_game_session
# noinspection PyUnresolvedReferences
from flask import make_response, request
from backend.controllers.scraping import scrape_vehicle
import json
SESSION_TIME = 3600
GAME_TIME = 100


def room_name_converter(room_name):
    if room_name == "car":
        return "otomobil"
    elif room_name == "motorcycle":
        return "motosiklet"
    elif room_name == "rented-vehicle":
        return "kiralik-arac"
    else:
        return room_name


def game_finished():
    # room name sadece en sondaki kısmı almalı kacagider.net/rooms/car, mesela car almalı burda
    top3 = {}
    keys = redis_client.keys("guessed_prices:*")
    room_names = [key.split(':', 1)[1] for key in keys]
    room_names = [room_name_converter(room_name) for room_name in room_names]
    user_keys = redis_client.keys("session:*")
    for key in user_keys:
        redis_client.hset(key, "guess_count", 0)

    for room_name in room_names:

        real_price = int(redis_client.hget(f"info:{room_name}", "fiyat"))

        data = redis_client.hgetall(f"guessed_prices:{room_name}")

        sorted_by_closeness = sorted(
            data.items(),
            key=lambda x: abs((x[1] / real_price * 100) - 100)
        )
        top_3 = sorted_by_closeness[:3]
        redis_client.set(f"leaderboard_top3:{room_name}", json.dumps(top_3))
        for user, guess in data.items():
            percentage_to_keep = (int(guess) / real_price) * 100
            leaderboard_key = f"leaderboard:{room_name}"
            redis_client.zadd(leaderboard_key, {user: percentage_to_keep})
            redis_client.hset(f"guessed_prices:{room_name}", user, 0)
