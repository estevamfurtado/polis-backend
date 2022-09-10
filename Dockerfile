FROM node

WORKDIR /usr/src/

COPY . .

EXPOSE 5000

RUN npm config rm proxy && npm config rm https-proxy
RUN npm config set fetch-retry-mintimeout 20000 && npm config set fetch-retry-maxtimeout 120000

RUN npm i && npm run build

CMD ["npm", "start"]