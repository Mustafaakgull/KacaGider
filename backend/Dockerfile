# Dockerfile
FROM python:3.11-slim

# sistem bağımlılıklarını yükle
RUN apt-get update && apt-get install -y gcc

# çalışma dizini
WORKDIR /app

# pip güncelle + requirements yükle
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# tüm backend kodlarını kopyala
COPY . .

# port belirt
EXPOSE 5000

# başlatma komutu
CMD ["python", "app.py"]
