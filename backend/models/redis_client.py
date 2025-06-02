import os
from redis import Redis
from urllib.parse import urlparse

redis_url = os.environ.get("REDIS_URL")
parsed_url = urlparse(redis_url)

redis_client = Redis(
    host=parsed_url.hostname,
    port=parsed_url.port,
    password=parsed_url.password,
    decode_responses=True
)
