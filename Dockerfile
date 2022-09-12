FROM node:16

WORKDIR /usr/src/

COPY . .

EXPOSE 5000

RUN npm i
RUN npm run build

RUN npm run prisma:deploy
RUN npm run prisma:seed
RUN node dist/src/server.js
