FROM node:18

ARG SERVICE_PORT

ENV PORT=${SERVICE_PORT}

WORKDIR /app

COPY ./account/package*.json .

RUN npm install

COPY ./handlers ./src/handlers
COPY ./auth ./src/auth
COPY ./account .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
