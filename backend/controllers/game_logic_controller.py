from backend.models.redis_client import redis_client
from backend.controllers.session_controller import create_game_session
# noinspection PyUnresolvedReferences
from flask import make_response, request
from backend.controllers.scraping import scrape_vehicle
import json
import copy
SESSION_TIME = 3600
GAME_TIME = 100


def room_name_converter(room_name):
    if room_name == "car":
        return "otomobil"
    elif room_name == "motorcycle":
        return "motosiklet"
    elif room_name == "rented-vehicles":
        return "kiralik-araclar"
    else:
        return room_name

def game_starts():
    pass



def game_finished():
    # room name sadece en sondaki kısmı almalı kacagider.net/rooms/car, mesela car almalı burda
    keys = redis_client.keys("guessed_prices:*")
    room_names = [key.split(':', 1)[1] for key in keys]
    room_names = [room_name_converter(room_name) for room_name in room_names]

    user_keys = redis_client.keys("session:*")
    for key in user_keys:
        redis_client.hset(key, "guess_count", 0)

    for room_name in room_names:
        real_price = int(redis_client.hget(f"info:{room_name}", "fiyat"))

        data = redis_client.hgetall(f"guessed_prices:{room_name}")
        top3_list = {}
        for user, guess in data.items():
            proximity = min(real_price,int(guess)) / max(real_price, int(guess))
            score = round(proximity * 1000)
            top3_list.update({user: score})
            print("OYUN SONU user of score", user ,"score:", score)
            redis_client.zincrby(f"leaderboard:{room_name}", score, user)

            # redis_client.hset(f"guessed_prices:{room_name}", user, 0)
        top3_list.update({"mustafa": 900})
        top3_list.update({"omer": 760})
        top3_list.update({"haitem": 120})

        sorted_dict_desc = dict(sorted(top3_list.items(), key=lambda item: item[1], reverse=True))
        # redis_client.zadd(f"leaderboard_top3:{room_name}", {k: int(v) for k, v in sorted_dict_desc.items()})

    # prop data
    redis_client.zadd("leaderboard:otomobil", {"mustafa": "900"})
    redis_client.zadd("leaderboard:otomobil", {"omer": "760"})
    redis_client.zadd("leaderboard:otomobil", {"haitem": "120"})


def set_all_user_price_zero():
    keys = redis_client.keys("guessed_prices:*")
    room_names = [key.split(':', 1)[1] for key in keys]
    for room_name in room_names:
        redis_client.delete(f"leaderboard_top3:{room_name}")
        users = redis_client.hkeys(f"guessed_prices:{room_name}")
        for hkey in users:
            redis_client.hset(f"guessed_prices:{room_name}", hkey, 0)