FROM node:17

WORKDIR /project

COPY music/ .

RUN npm install -g @angular/cli -y && \
    npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

