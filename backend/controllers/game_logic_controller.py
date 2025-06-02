from models.redis_client import redis_client
# noinspection PyUnresolvedReferences
from flask import make_response, request
SESSION_TIME = 3600
GAME_TIME = 100


def clicked_guess(guessed_price):
    cookie_session = request.cookies.get("session_id")
    user = redis_client.hgetall(f"session:{cookie_session}")

    if int(user["guess_count"]) <= 3:

        redis_client.hincrby(f"session:{cookie_session}", "guess_count", 1)

        real_price = redis_client.hget(f"info:otomobil", "fiyat")
        real_price = int(real_price)
        percentage_price = (guessed_price / real_price) * 100

        redis_client.hset(f"guessed_prices:{user['current_room']}", {user['username']}, guessed_price)
        print(percentage_price)
        print(real_price)
        print(guessed_price)
        print(user)

        if percentage_price < 100:
            return {"message": "successfully guessed", "hint": "You need to guess higher", "status": 200}
        else:
            return {"message": "successfully guessed", "hint": "You need to guess lower", "status": 200}

    else:
        return {"message": "maximum number of guesses reached", "status": 400}


def game_finished(game_session):
    cookie_session = request.cookies.get("session_id")
    real_price = redis_client.hget(f"test:car", "price")

    data = redis_client.hgetall(f"guessed_prices:{game_session}")

    # burada muhtemelen gerekli userların countu 0 olmayacak da 1 tanesinin olacak, bug var muhtemel
    redis_client.hset(f"session:{cookie_session}", "guess_count", 0)

    real_price = int(real_price)

    for user, guess in data.items():
        int(guess)
        percentage_to_keep = (guess / real_price) * 100
        leaderboard_key = f"leaderboard:{game_session}"
        redis_client.zadd(leaderboard_key, {user: percentage_to_keep})
        redis_client.hset(f"guessed_prices:{game_session}", user, 0)
        print(f"Added {user} with score {percentage_to_keep} to {leaderboard_key}")
