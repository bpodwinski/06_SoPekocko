FROM node:12
LABEL maintainer="contact@benoitpodwinski.com"

WORKDIR /usr/src/app

COPY . .

RUN npm install pm2 @angular/cli -g \
    && cd backend/ \
    && npm install \
    && cd ../frontend/ \
    && npm install

EXPOSE 4200
CMD [ "pm2-runtime", "start", "pm2.config.js" ]