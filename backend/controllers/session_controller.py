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
    value =  {
        "username": username,
        "theme": "night",
        "guess_count": "0",
        "created_at": str(datetime.datetime.now())
    }
    # 1 saat session_id tut
    redis_client.setex(f"session:{session_id}", SESSION_TIME, value)
    response = make_response({"message": "Login successful"})

    response.set_cookie(
        'session_id',
        session_id,
        httponly=True,
        # secure=True,  # Normalde bunu kullanmamız lazım, sadece https ten veri atmasi için, hostingi ayarlayınca değişecek
        secure=False,
        samesite='Lax',  # controls cross-site behavior
        max_age=SESSION_TIME
)
    return response

def create_game_session():
    game_session_id = str(uuid.uuid4())
    # redis_client.setex(f"session:{game_session_id}",GAME_TIME, "public_game")
#     TODO

def join_game_session(session_id):
    pass

def check_session_user():
    return redis_client.get(f"session:{request.cookies.get('session_id')}")


def delete_session():
    redis_client.delete(f"session:{request.cookies.get('session_id')}")

