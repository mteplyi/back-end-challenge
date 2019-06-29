FROM node:10.16.0-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY ./ ./
RUN npm run build:prod

EXPOSE 1030 3000
CMD npm run start:prod
