FROM revolutionsystems/python:3.6.3-wee-optimized-lto
ENV PYTHONUNBUFFERED 1
# Requirements have to be pulled and installed here, otherwise caching won't work

# Clone the conf files into the docker container
COPY django_ssr /app
COPY requirements.txt /requirements.txt
# Install requirements
RUN pip install -U pip
# RUN pip install -r /home/app/requirements/production.txt
RUN pip install -r /requirements.txt

WORKDIR /app

VOLUME ["/tmp","/var/tuteria","/var/tuteria_media"]
# run startup scripts which copies staticfiles, run migration and starts server
CMD ["python manage.py runserver"]

EXPOSE 8000
