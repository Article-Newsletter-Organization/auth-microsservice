FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

CMD npx prisma migrate dev -y