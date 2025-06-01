FROM python:3.11-slim

# sistem bağımlılıkları (mysqlclient ve bs4 için gerekli)
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    libxml2-dev \
    libxslt1-dev \
    && apt-get clean

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
