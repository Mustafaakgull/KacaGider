import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random
from dotenv import load_dotenv
from flask import jsonify
from models.redis_client import redis_client

load_dotenv()
# my_email = os.getenv("KACA_GİDER_EMAİL")
# password = os.getenv("KACA_GİDER_EMAİL_PASSWORD")

my_email = "pythontestomer@gmail.com"
password = "afahfivfidsjbmdu"


def send_verification_mail(mail):
    verification_code = str(random.randint(1000, 9999))
    msg = MIMEMultipart()
    msg['From'] = my_email
    msg['To'] = mail
    msg['Subject'] = "Subject: Hesabınızı Doğrulayın"
    body = f"Your verification code: {verification_code}"
    msg.attach(MIMEText(body, 'plain'))
    redis_client.setex(name=f"verify:{mail}", time=300, value=verification_code)
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(my_email, password)
    server.send_message(msg)

    return verification_code


def verify_code(email, code):
    saved_code = redis_client.get(name=f"verify:{email}")
    if not saved_code:
        return False

    saved_code = saved_code.decode() if isinstance(saved_code, bytes) else saved_code

    if code == saved_code:
        redis_client.delete(f"verify:{email}")
        return True
    else:
        return False


# def verify_code(email, code):
#     saved_code = redis_client.get(f"verify:{email}")
#     if not saved_code:
#         print("CODE NOT FOUND IN REDIS")
#         return False
#
#     if isinstance(saved_code, bytes):
#         saved_code = saved_code.decode()
#
#     print(f"[DEBUG] Comparing codes: user={code} redis={saved_code}")
#     return code == saved_code


#
# def verify_code(email, code):
#     saved_code = redis_client.get(name=f"verify:{email}")
#     if not saved_code:
#         return False
#
#     if code == saved_code.decode():  # ✅ decode şart
#         redis_client.delete(f"verify:{email}")
#         return True
#     return False
