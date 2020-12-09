FROM node:lts

RUN mkdir /frontend
WORKDIR /frontend

COPY ./package.json /frontend/package.json
RUN npm i --silent
RUN npm i -g serve

COPY . /frontend/

ENTRYPOINT [ "/frontend/entrypoint.sh" ]
