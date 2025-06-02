import json

from backend.models.redis_client import redis_client

session_id = ""
room_name = ""
username = ""
guessed_price = ""
points = ""
code = ""
vehicle_type = ""
top3_list = []

redis_client.hset(f"session:{session_id}", mapping={
    "username": username,
    "guess_count": 0,
    "current_room": "",
    "created_at": str(datetime.datetime.now())
})

redis_client.hset(f"guessed_prices:{room_name}", mapping={
    "username": username,
    "guessed_price": guessed_price
})

redis_client.zadd(f"leaderboard:{room_name}", mapping={
    username: points
})

redis_client.set(f"leaderboard_top3:{room_name}",
                 json.dumps(top_3)
)


redis_client.set(f"verify{username}", code)

redis_client.hset(f"info:{vehicle_type}", vehicle_info)
# vehicle_info example: {'İlan No': 'Kopyalandı29877699', 'İlan Tarihi': '27 Mayıs 2025', 'Marka': 'Hyundai',
# 'Seri': 'Accent Blue', 'Model': '1.6 CRDI Mode Plus', 'Yıl': '2014', 'Kilometre': '195.500 km',
# 'Vites Tipi': 'Düz', 'Yakıt Tipi': 'Benzin', 'Kasa Tipi': 'Sedan', 'Renk': 'Beyaz', 'Motor Hacmi': '1582 cc',
# 'Motor Gücü': '136 hp', 'Çekiş': 'Önden Çekiş', 'Araç Durumu': 'İkinci El', 'Ort. Yakıt Tüketimi': '4,5 lt',
# 'Yakıt Deposu': '43 lt', 'Boya-değişen': '1 değişen, 1 boyalı', 'Takasa Uygun': 'Takasa Uygun', 'Kimden': 'Galeriden',
# 'fiyat': '585.000 TL'}
redis_client.rpush(f"photos:{vehicle_type}", photos)

