FROM node:18.20-alpine3.19

WORKDIR /application

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY tsconfig.json ./

RUN npx prisma generate

COPY . .

CMD npm run start:dev