# TODO add check login function if session currently logined





# RESET ALL SCORE IN A ROOM

import redis

r = redis.Redis()

players = r.zrange("leaderboard:room123", 0, -1)
for player in players:
    r.zadd("leaderboard:room123", {player: 0})


