# README

This is the README for the authentication micro-service of the system, developed using the NestJS framework and TypeScript.

## Requirements

- **Node.js**: ^16.0
- **Database**: Postgres (version >= 13.0)
- **Token Cache**: Redis

Make sure Node.js is in the specified version and that the databases are configured correctly before proceeding.

## Installation

1. Clone this repository.
2. Install dependencies using the command: `npm install`
3. Generate an RSA key pair and place them in the `src/Configuration/keys` directory. Name the private key file `private_key.pem` and the public key file `public_key.pem`.

   Example commands to generate the keys:

   ```bash
   openssl genpkey -algorithm RSA -out src/Configuration/keys/private_key.pem
   openssl rsa -pubout -in src/Configuration/keys/private_key.pem -out src/Configuration/keys/public_key.pem
   ```

4. Configure environment variables by creating a `.env` file. Use the `.env.example` file as an example.

   [Example `.env.example` file](.env.example)
5. Use the Prisma CLI to generate entities and models.

    ```bash
        npx prisma generate
    ```
6. Use the Prisma CLI to apply the schema to the database.

    ```bash
        npx prisma migrate dev
    ```

## Usage

The authentication micro-service has two main routes:

1. **Login**: Route to authenticate users and obtain an access token.

2. **Verify Token**: Route to verify the validity of the access token.

For more details about the endpoints, refer to the [routes.md](routes.md) file.

## Contributors

People who contributed code and ideas to this micro-service.

### Emanuel Vasconcelos Nobre
Creator of the project and responsible for this micro-service.
#### Social Media
- [LinkedIn](https://www.linkedin.com/in/emanuel-vasconcelos-404329201/)
- [GitHub](https://github.com/emanuelvasconnobre)