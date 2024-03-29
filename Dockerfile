FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm install --prefix client --only=production
COPY admin/package*.json admin/
RUN npm install --prefix admin --only=production

COPY server/package*.json server/
RUN npm install --prefix server --only=production

COPY client/ client/
COPY client/build client/
COPY admin/ admin/

COPY server/ server/

RUN npm run build-linux --prefix client

RUN npm run build-linux --prefix admin

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 5000