# README

Este é o README para o micro-serviço de autenticação do sistema, desenvolvido utilizando o framework NestJS e TypeScript.

## Requisitos

- **Node.js**: ^16.0
- **Banco de Dados**: Postgres (versão >= 13.0)
- **Cache de Tokens**: Redis

Certifique-se de que o Node.js está na versão especificada e que os bancos de dados estão configurados corretamente antes de prosseguir.

## Instalação

1. Clone este repositório.
2. Instale as dependências utilizando o comando: `npm install`
3. Crie um par de chaves RSA e coloque-as no caminho `src/Configuration/keys`. Nomeie o arquivo da chave privada como `private_key.pem` e o da chave pública como `public_key.pem`.

   Exemplo de comandos para gerar as chaves:

   ```bash
   openssl genpkey -algorithm RSA -out src/Configuration/keys/private_key.pem
   openssl rsa -pubout -in src/Configuration/keys/private_key.pem -out src/Configuration/keys/public_key.pem
   ```

4. Configure as variáveis de ambiente criando um arquivo `.env`. Use o arquivo `.env.example` como exemplo.

   [Exemplo de arquivo `.env.example`](.env.example)
5. Use a cli do prisma para gerar as entidades e modelos.

    ```bash
        npx prisma generate
    ```
6. Use a cli prisma para inserir o schema no banco de dados.

    ```bash
        npx prisma migrate dev
    ```


## Uso

O micro-serviço de autenticação possui duas rotas principais:

1. **Login**: Rota para autenticar usuários e obter um token de acesso.

2. **Verificar Token**: Rota para verificar a validade do token de acesso.

Para obter mais detalhes sobre os endpoints, consulte o arquivo [rotas.md](rotas.md).

## Créditos

O principal contribuidor para este projeto é **Emanuel Vasconcelos Nobre**.

## Redes Sociais

- [LinkedIn](https://www.linkedin.com/in/emanuel-vasconcelos-404329201/)
- [GitHub](https://github.com/emanuelvasconnobre)