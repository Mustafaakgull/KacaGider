import threading
import time
from backend.controllers.scraping import scrape_vehicle
from backend.controllers.game_logic_controller import game_finished, set_all_user_price_zero


# when game starts
# redis_client.delete(f"leaderboard_top3:{room_name}")


def fetch_data_every(interval,wait):
    def task():
        while True:
            print(f"[{time.ctime()}] Fetching new data...")
            scrape_vehicle()
            time.sleep(interval)
            game_finished()
            set_all_user_price_zero()
            time.sleep(wait)

    thread = threading.Thread(target=task, daemon=True)
    thread.start()

