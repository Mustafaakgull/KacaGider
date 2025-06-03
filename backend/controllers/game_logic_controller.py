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
    room_names.remove("_testuser123")
    user_keys = redis_client.keys("session:*")
    for key in user_keys:
        redis_client.hset(key, "guess_count", 0)

    for room_name in room_names:
        print("sdas FIYAT", redis_client.hget(f"info:{room_name}", "fiyat"), "room_name", room_name,"namesss",room_names)
        real_price = int(redis_client.hget(f"info:{room_name}", "fiyat"))

        data = redis_client.hgetall(f"guessed_prices:{room_name}")
        print("daata for top3", data)
        top3_list = {}
        for user, guess in data.items():
            # percentage_to_keep = abs((int(guess) / real_price) * 100
            # score = max(0, (100 - percentage_to_keep))
            # if percentage_to_keep > 100:
            #     percentage_to_keep = 100 - (percentage_to_keep - 100)
            print("GAMEFİNİSİHED USER",user)
            print("proximity before guess", guess)
            proximity = min(real_price,int(guess)) / max(real_price, int(guess))
            score = round(proximity * 1000)
            top3_list.update({user: score})
            print("percentage_to_keep:", score)
            leaderboard_key = f"leaderboard:{room_name}"
            redis_client.zadd(leaderboard_key, {user: score})
        users = redis_client.hkeys(f"guessed_prices:{room_name}")
        for hkey in users:
            redis_client.hset(f"guessed_prices:{room_name}", hkey, 0)
        # redis_client.hset(f"guessed_prices:{room_name}", user, 0)
        sorted_dict_desc = dict(sorted(top3_list.items(), key=lambda item: item[1], reverse=True))
        print("sorrteeed",sorted_dict_desc)
        redis_client.delete(f"leaderboard_top3:{room_name}")
        redis_client.zadd(f"leaderboard_top3:{room_name}", {k: int(v) for k, v in sorted_dict_desc.items()})
        print("inside top3", redis_client.zrevrange(f"leaderboard_top3:{room_name}", 0, -1, withscores=True))
    redis_client.zadd("leaderboard:otomobil", {"pppppi": "90"})
    redis_client.zadd("leaderboard:otomobil", {"pipi": "31"})
    redis_client.zadd("leaderboard:otomobil", {"seeeeeeszeeekzs": "62"})

