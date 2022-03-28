FROM python:3.9

WORKDIR /server

RUN apt update && \
    apt install sndfile-programs sndfile-tools ffmpeg -y && \
    mkdir /storage

COPY src/ .

RUN pip3 install -r requirements.txt

EXPOSE 5000

ENV FLASK_APP=server
ENV FLASK_ENV=development

CMD ["flask", "run", "--host", "0.0.0.0"]
