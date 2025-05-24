from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import requests
from bs4 import BeautifulSoup
from time import sleep

# chrome_options = webdriver.ChromeOptions()
# chrome_options.add_experimental_option("detach", True)
# driver = webdriver.Chrome(options=chrome_options)

URL = "https://www.arabam.com/ilan/galeriden-satilik-fiat-punto-grande-1-4-fire-dynamic/2006-fiat-punto-grande-1-4-benzin-lpg-fire-dynamic/29752672"

response = requests.get(URL)
res = response.text

soup = BeautifulSoup(res, "html.parser")
# print(soup)
photos = soup.find_all("div", class_="swiper-slide")
values = soup.find_all("div", class_="property-item")

info_key_list = []
info_value_list = []
for info in values:
    info_key = info.find_all('div', class_="property-key")
    info_key = [info.get_text(strip=True) for info in info_key]
    info_key_list.append(info_key[0])
    info_value = info.find_all('div', class_="property-value")
    info_value = [info.get_text(strip=True) for info in info_value]
    info_value_list.append(info_value[0])
result = dict(zip(info_key_list, info_value_list))
print(result)

photo_link_list = []
for photo in photos:
    photo_link_list.append(photo.find_all("img")[0].get("data-src"))

photo_link_list = photo_link_list[:len(photo_link_list)//2]
# print(photo_link_list)
print(photo_link_list)
