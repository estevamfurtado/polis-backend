FROM node

WORKDIR /usr/src/app

COPY . .

EXPOSE 5000

RUN npm i && npm run build

CMD ["npm", "start"]