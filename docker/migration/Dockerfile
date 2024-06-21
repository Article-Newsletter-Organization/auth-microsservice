FROM node:18.20-alpine3.19

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

CMD npx prisma migrate deploy && npm run seed:auth