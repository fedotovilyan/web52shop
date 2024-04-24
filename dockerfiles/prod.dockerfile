FROM node:20.12.0-alpine3.19
WORKDIR /app
RUN apk update && apk add bash dumb-init && rm -rf /var/cache/apk/*
COPY ./package.json .
RUN npm install && npm cache clean --force
COPY . .
CMD npm run build && npm run start