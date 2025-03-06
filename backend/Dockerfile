# Use official Python runtime as a base image
FROM python:3.10-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy application code
COPY . .

# Expose port 5000 for Flask
EXPOSE 5000

# Set environment variable for Flask app
ENV FLASK_APP=main.py

# Start the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]