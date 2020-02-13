FROM node:latest

WORKDIR /home/nodejs/app

RUN npm install pm2 -g --production

COPY ./package.json .
RUN npm install --production
COPY ./src/config.js ./src/config.js
COPY ./services ./services

ENV  NODE_ENV production

CMD ["npm", "run", "production:crawl-feeds"]
