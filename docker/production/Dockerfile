FROM node:18.20-alpine3.19

WORKDIR /application

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY tsconfig.json ./

RUN npx prisma generate

COPY . .

RUN npm run build

CMD npm run start:prod