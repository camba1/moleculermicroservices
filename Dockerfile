FROM node
WORKDIR /code

RUN npm i moleculer --save
RUN npm i moleculer-cli -g

RUN npm install && npm ls

COPY . /code

EXPOSE 3000
