FROM node:10
LABEL maintainer="contact@benoitpodwinski.com"

WORKDIR /usr/src/app

COPY . .

RUN npm install pm2 @angular/cli -g \
    && npm install \
    && cd backend/ \
    && npm install

EXPOSE 4200
CMD [ "pm2-runtime", "start", "pm2.config.js" ]