import requests
from bs4 import BeautifulSoup
import random
from models.redis_client import redis_client
import re

def scrape_vehicle():
    success = False
    types = ["otomobil", "motosiklet", "kiralik-araclar"]
    for type_of in types:
        while success is False:
            try:
                # kiralik-araclar, motosiklet, otomobil, suanlık bu kadar
                # kiralik-araclar içeriği daha farklı

                page_num = random.randint(1, 30)
                minimal_page_num = random.randint(1, 5)
                list_item_num = random.randint(1, 40)
                info_key_list = []
                info_value_list = []
                photo_link_list = []
                car_page_links = []
                main_url_for_cars = f"https://www.arabam.com/ikinci-el/{type_of}?sort=price.desc&take=50&page={page_num}"
                if type_of == "kiralik-araclar":
                    main_url_for_cars = f"https://www.arabam.com/ikinci-el/{type_of}?sort=price.desc&take=50&page={minimal_page_num}"
                    headers = {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
                    }
                main_response = requests.get(main_url_for_cars, headers=headers)
                main_res = main_response.text
                soup1 = BeautifulSoup(main_res, 'html.parser')
                listed_cars = soup1.find_all('tr', class_="listing-list-item")

                for cars in listed_cars:
                    car_page_links.append(cars.find('a')['href'])

                page_url = "https://www.arabam.com" + car_page_links[list_item_num]
                response = requests.get(page_url)
                car_page_res = response.text

                soup2 = BeautifulSoup(car_page_res, "html.parser")
                photos = soup2.find_all("div", class_="swiper-slide")
                values = soup2.find_all("div", class_="property-item")
                price = soup2.find("div", class_="desktop-information-price").get_text(strip=True)
                price = re.sub(r"[^\d]", "", price)
                for info in values:
                    info_key_list.append(info.find('div', class_="property-key").get_text(strip=True))
                    info_value_list.append(info.find('div', class_="property-value").get_text(strip=True))

                for photo in photos:
                    photo_link_list.append(photo.find("img").get("data-src"))
                photo_link_list = photo_link_list[:len(photo_link_list) // 2]

                result = dict(zip(info_key_list, info_value_list))
                result.update({"fiyat": price})

                redis_client.hset(f"info:{type_of}", mapping=result)
                redis_client.delete(f"photos:{type_of}")
                redis_client.rpush(f"photos:{type_of}", *photo_link_list)
                res = redis_client.lrange(f"photos:{type_of}", 0, -1)
                success = True
            except:
                pass
        success = False

# scrape_vehicle("otomobil")
