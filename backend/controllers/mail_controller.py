import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import random

my_email = "kacagiderr@gmail.com"
password = "arilthbsqqpzolzl"

verification_code = random.randint(1000, 9999)

def send_verification_mail(mail):
    msg = MIMEMultipart()
    msg['From'] = my_email
    msg['To'] = mail
    msg['Subject'] = "Subject: Hesabınızı Doğrulayın"
    body = (f"Your verification code: {verification_code}")
    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(my_email, password)
    server.send_message(msg)

    print("Email sent successfully!")
