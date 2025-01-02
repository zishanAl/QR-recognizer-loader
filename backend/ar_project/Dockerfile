# Use the official Python image as the base
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirements.txt from the backend folder
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything from the backend folder into the container
COPY . /app/

# Expose the port Django will run on
EXPOSE 8000

# Run migrations and start the Django development server
CMD ["sh", "-c", "python ar_project/manage.py migrate && python ar_project/manage.py runserver 0.0.0.0:8000"]