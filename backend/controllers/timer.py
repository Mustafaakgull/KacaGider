import threading
import time
from backend.controllers.scraping import scrape_vehicle
from backend.controllers.game_logic_controller import game_finished, set_all_user_price_zero


# when game starts
# redis_client.delete(f"leaderboard_top3:{room_name}")

time_sended = 0
def fetch_data_every(interval,wait):
    def task():
        global time_sended
        while True:
            print(f"[{time.ctime()}] Fetching new data...")
            scrape_vehicle()
            for i in range(interval):
                time_sended = interval - i
                print("sleeeping bro, timer:", time_sended)
                time.sleep(1)
            #
            # time.sleep(interval)
            time_sended = 0
            game_finished()
            set_all_user_price_zero()
            time.sleep(wait)

    thread = threading.Thread(target=task, daemon=True)
    thread.start()

