FROM node:16

WORKDIR /app

EXPOSE 4000

COPY . .

RUN npm install -f

CMD npm run docker:dockerfile