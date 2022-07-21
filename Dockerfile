FROM node:16-alpine3.15

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN apk update && yarn install

COPY . .
RUN yarn build

ENTRYPOINT ["sh", "/home/node/app/docker-entrypoint.sh"]
