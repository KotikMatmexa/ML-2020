FROM node:latest

RUN npm install -g create-react-app

RUN mkdir -p /code
WORKDIR /code

COPY . .

WORKDIR /code/fe/


RUN npm install

CMD ["npm", "start"]


