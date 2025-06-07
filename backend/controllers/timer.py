import threading
import time
from controllers.scaping_to_local import take_vehicle_info_locally
from controllers.game_logic_controller import game_finished, set_all_user_price_zero

time_sended = 0

def fetch_data_every(interval, wait):
    def task():
        global time_sended
        while True:
            take_vehicle_info_locally()
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
