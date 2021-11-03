# Step 1
FROM node:16-alpine as build-step
RUN mkdir /app
WORKDIR /app

COPY package*.json /app/
COPY tsconfig.json /app
COPY src /app/src/

RUN ls -a


RUN npm install
RUN npm run build

EXPOSE 443

CMD [ "node", "./dist/main.js" ]