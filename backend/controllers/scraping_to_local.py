import requests
from bs4 import BeautifulSoup
import random
from models.redis_client import redis_client
import re

def take_vehicle_info_locally():

    number = random.randint(1,499)
    result_otomobil = redis_client.hgetall(f"info:otomobil{number}")
    result_motosiklet = redis_client.hgetall(f"info:motosiklet{number}")
    result_kiralik_araclar = redis_client.hgetall(f"info:kiralik-araclar{number}")

    pictures_otomobil = redis_client.lrange(f"photos:otomobil{number}", 0, -1)
    pictures_motosiklet = redis_client.lrange(f"photos:motosiklet{number}", 0, -1)
    pictures_kiralik_araclar = redis_client.lrange(f"photos:kiralik-araclar{number}", 0, -1)

    redis_client.hset(f"info:otomobil", mapping=result_otomobil)
    redis_client.hset(f"info:motosiklet", mapping=result_motosiklet)
    redis_client.hset(f"info:kiralik-araclar", mapping=result_kiralik_araclar)

    redis_client.delete(f"photos:otomobil")
    redis_client.delete(f"photos:motosiklet")
    redis_client.delete(f"photos:kiralik-araclar")

    redis_client.rpush(f"photos:otomobil", *pictures_otomobil)
    redis_client.rpush(f"photos:motosiklet", *pictures_motosiklet)
    redis_client.rpush(f"photos:kiralik-araclar", *pictures_kiralik_araclar)
