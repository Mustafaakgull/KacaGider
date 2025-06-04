import threading
import time
from backend.controllers.scraping import scrape_vehicle
from backend.controllers.game_logic_controller import game_finished

show_results = False

# when game starts
# redis_client.delete(f"leaderboard_top3:{room_name}")


def fetch_data_every(interval,wait):
    def task():
        global show_results
        while True:
            print(f"[{time.ctime()}] Fetching new data...")
            scrape_vehicle()

            # game_finished()
            time.sleep(interval)
            show_results = True
            time.sleep(wait)
            show_results = False

    thread = threading.Thread(target=task, daemon=True)
    thread.start()

