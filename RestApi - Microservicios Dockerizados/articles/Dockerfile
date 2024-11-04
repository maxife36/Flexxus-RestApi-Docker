FROM node:20.18.0

ARG SERVICE_PORT

ENV PORT=${SERVICE_PORT}

WORKDIR /app

COPY ./articles/package*.json . 

RUN npm install

COPY ./handlers ./src/handlers
COPY ./auth ./src/auth
COPY ./articles .

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]