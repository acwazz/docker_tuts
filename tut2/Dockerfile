FROM node:lts

RUN mkdir /backend
WORKDIR /backend

COPY ./package.json /backend/package.json
RUN npm i

COPY . /backend/

CMD [ "node", "server.js"]