import threading
import time
from controllers.scraping import scrape_vehicle
from controllers.game_logic_controller import game_finished, set_all_user_price_zero


# when game starts
# redis_client.delete(f"leaderboard_top3:{room_name}")

time_sended = 0
def fetch_data_every(interval,wait):
    def task():
        global time_sended
        while True:
            scrape_vehicle()
            for i in range(interval):
                time_sended = interval - i
                time.sleep(1)
            #
            # time.sleep(interval)
            time_sended = 0
            time_sended = interval
            game_finished()
            time.sleep(wait)
            set_all_user_price_zero()

    thread = threading.Thread(target=task, daemon=True)
    thread.start()

