FROM node:24-alpine-3.21

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install

RUN apk add --no-cache \
    openssl \
    musl \
    libgcc \
    zlib 

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Gerando o Prisma Client
RUN npx prisma generate

# COPY
COPY . .

# Run and expose the server on port 5000
EXPOSE 8000

# A command to start the server 
CMD npm run start:dev