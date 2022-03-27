FROM python:3.9

WORKDIR /server

ENV FLASK_APP=server
ENV FLASK_RUN_HOST=0.0.0.0

RUN apt update && \
    apt install sndfile-programs sndfile-tools ffmpeg -y && \
    mkdir /storage

COPY src/ .

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["flask", "run"]
