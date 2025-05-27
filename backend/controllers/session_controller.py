from datetime import datetime

from backend.models.redis_client import redis_client

# noinspection PyUnresolvedReferences
from flask import make_response, request
import uuid
import datetime

SESSION_TIME = 3600
GAME_TIME = 100


def create_session(username):
    session_id = str(uuid.uuid4())
    print("sonradan sil, session id: "+session_id)
    redis_client.hset(f"session:{session_id}", mapping={
        "username": username,
        "theme": "dark",
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
        httponly=True,
        # secure=True,  # Normalde bunu kullanmamız lazım, sadece https ten veri atmasi için, hostingi ayarlayınca değişecek
        secure=False,
        samesite='Lax',  # controls cross-site behavior
        # max_age=SESSION_TIME
    )

    # SONRA SİLİNECEK
    print("response" + str(response))
    print("session id "+session_id)
    print()

    return response


def create_game_session(game_type):
    # game_session_id = str(uuid.uuid4())
    redis_client.hset(f"guessed_prices:public_room_{game_type}", mapping={})
    redis_client.zadd(f"leaderboard:public_room_{game_type}")


# TODO
def create_private_game_session(game_type):
    redis_client.zadd(f"leaderboard:private_room_{game_type}")

# TODO SOCKET
def join_game_session(game_session):
    redis_client.hset(f"session:{request.cookies.get('session_id')}", "current_room", game_session)


def get_session_username():
    return redis_client.hget(f"session:{request.cookies.get('session_id')}", "username")


def delete_session():
    redis_client.delete(f"session:{request.cookies.get('session_id')}")
