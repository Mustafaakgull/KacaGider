import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random
from dotenv import load_dotenv
from flask import jsonify
from backend.models.redis_client import redis_client

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

    print("Email sent successfully!")
    return verification_code


def verify_code(email, code):
    saved_code = redis_client.get(name=f"verify:{email}")
    if not saved_code:
        return False

    if code == saved_code:
        redis_client.delete(f"verify:{email}")
        return True
    else:
        return jsonify({"error": "Invalid code"}), 400
