FROM node:24-alpine3.21

WORKDIR /app

# instaling prisma cli globally
RUN npm install -g prisma

# instaling some necessary libs to use prisma properly
RUN apk add --no-cache \
    openssl \
    musl \
    libgcc \
    zlib 

# Copy prisma files
COPY prisma ./prisma

ENV DATABASE_URL

# A command to start the server 
CMD prisma db push --accept-data-loss --skip-generate