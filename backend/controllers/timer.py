import multiprocessing
import threading
import time
from controllers.scraping import scrape_vehicle
from controllers.game_logic_controller import game_finished, set_all_user_price_zero


def fetch_data_every(interval, wait):
    def task():
        global time_sended
        while True:
            # Spawn a subprocess to run the scraper safely
            p = multiprocessing.Process(target=scrape_vehicle)
            p.start()
            p.join()

            for i in range(interval):
                time_sended = interval - i
                time.sleep(1)

            time_sended = 0
            time_sended = interval
            game_finished()
            time.sleep(wait)
            set_all_user_price_zero()

    thread = threading.Thread(target=task, daemon=True)
    thread.start()
