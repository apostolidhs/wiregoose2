FROM node:latest

WORKDIR /home/nodejs/app

RUN yarn global add pm2 --production

COPY ./package.json .
RUN yarn --production
COPY ./src/config.js ./src/config.js
COPY ./services ./services

ENV  NODE_ENV production

CMD ["yarn", "production:crawl-feeds"]
