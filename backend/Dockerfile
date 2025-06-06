FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libmariadb-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    libxml2-dev \
    libxslt1-dev \
    pkg-config \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

ENV PYTHONPATH=/app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install gunicorn eventlet

EXPOSE 5000

CMD ["gunicorn", "-k", "eventlet", "-w", "1", "-b", "0.0.0.0:5000", "app:socketio"]
