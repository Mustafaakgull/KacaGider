from datetime import datetime
from models.redis_client import redis_client
from flask import make_response, request
import uuid
import datetime
import random
import string
SESSION_TIME = 3600
GAME_TIME = 100
session_id_global = None

def create_session(username):
    session_id = str(uuid.uuid4())
    global session_id_global
    session_id_global = session_id
    redis_client.hset(f"session:{session_id}", mapping={
        "username": username,
        "guess_count": 0,
        "current_room": "",
        "created_at": str(datetime.datetime.now())
    })
    # 1 saat session_id tut
    redis_client.expire(f"session:{session_id}", SESSION_TIME)

    response = make_response({"message": "Login successful"})
    response.set_cookie(
        'session_id',
        session_id,
        domain=".kacagider.net",
        httponly=True,
        secure=True,
        samesite='None',
        max_age=SESSION_TIME
    )
    return response


def create_game_session(room_name):
    # game_session_id = str(uuid.uuid4())
    redis_client.hset(f"guessed_prices:{room_name}", mapping={})
    redis_client.zadd(f"leaderboard:{room_name}")


def generate_id():
    words = ["sunny", "mountain", "red", "wolf", "cloud", "green", "silent"]
    selected = random.sample(words, 3)
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
    return '-'.join(selected + [suffix])


def create_private_game_session(password, category):
    private_game_id = generate_id()
    redis_client.zadd(f"leaderboard:{private_game_id}")
    redis_client.hset(f"guessed_prices:{private_game_id}", mapping={})
    redis_client.hset(f"{private_game_id}", mapping={
        "password": password,
        "category": category
    })
    return {"private_room_name": private_game_id, "category": category}


def join_private_game_session(private_room_name, password):
    if password == redis_client.hget(f"{private_room_name}", "password"):
        redis_client.hset(f"session:{request.cookies.get('session_id')}", mapping={
            "current_room": private_room_name
        })
        return {"message": "success"}
    else:
        return {"message": "fail"}


def get_session_username():
    return redis_client.hget(f"session:{request.cookies.get('session_id')}", "username")


def delete_session():
    username = get_session_username()
    redis_client.delete(f"session:{cookie}")
    keys = redis_client.keys(f"leaderboard:*")
    for key in keys:
        redis_client.delete(key, username)

