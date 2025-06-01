import threading
import time
from backend.controllers.scraping import scrape_vehicle
from backend.controllers.game_logic_controller import game_finished


def fetch_data_every(interval):
    def task():
        while True:
            print(f"[{time.ctime()}] Fetching new data...")
            scrape_vehicle("otomobil")
            scrape_vehicle("motosiklet")
            scrape_vehicle("kiralik-araclar")
            game_finished()
            time.sleep(interval)
    thread = threading.Thread(target=task, daemon=True)
    thread.start()

