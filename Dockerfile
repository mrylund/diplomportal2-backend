# Step 1
FROM node:16-alpine as build-step
ENV DATABASE_URL postgresql://0.0.0.0:5432
RUN mkdir /app
WORKDIR /app

RUN npm install -g prisma --unsafe-perm
COPY ./prisma/schema.prisma ./

COPY package.json /app
COPY tsconfig.json /app
COPY src /app/src/

RUN ls -a


RUN npm install
RUN npm run build

CMD [ "node", "./dist/main.js" ]