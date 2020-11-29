FROM node:latest

RUN mkdir -p /code
WORKDIR /code

COPY . .

WORKDIR /code/fe


CMD ["npm", "install"]

CMD ["npm", "start"]


