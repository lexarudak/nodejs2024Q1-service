FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

RUN npm cache clean --force

COPY . .

ENV PORT 4000

EXPOSE $PORT


CMD [ "npm", "run", "sys:docker" ]
