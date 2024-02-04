## Enpoint: /sign-in
### Descrição:
Este Endpoint tem como objetivo permitir que o usuário pegue suas credenciais para permitir requisições com alto privilégio.

### Métodos HTTP:
- POST

### URL:
- ``http://localhost:3000/auth/sign-in``


## Método POST:

### Exemplo de Requisição:


```http
POST http://localhost:3000/auth/sign-in
Content-Type: application/json


{
  "email": "teste@example.com",
  "password": "strongpassword"
}
```


### Exemplo de Resposta:


#### Caso: `Sucesso`

```http 
Status code: 200

Content-Type: application/json


{
  "data": [
    {
      "expire": 3600,
      "token": "<<BASE64_TOKEN>>",
      "userId": "<<UUID>>",
      "role": "USER|ADMIN"
    }
  ],
  "error": null,
  "timestamp": "2024-01-21 12:05:23"
}
```

#### Caso: `Email ou senha incorretos`

```http 
Status code: 401

Content-Type: application/json


{
  "data": null,
  "error": {
    "message": "Email ou senha incorreto.",
    "name": "CredentialMissmatchError",
    "issues": []
  },
  "timestamp": "2024-01-21 12:05:23"
}
```


## Enpoint: /check-access-token
### Descrição:
Este Endpoint tem como objetivo checar se o Token de acesso passado é válido e quais são suas informações.

### Métodos HTTP:
- POST

### URL:
- ``http://localhost:3000/auth/check-access-token``


## Método POST:

### Exemplo de Requisição:


```http
POST http://localhost:3000/auth/check-access-token
Content-Type: application/json


{
  "token": "<<BASE64_TOKEN>>"
}
```


### Exemplo de Resposta:


#### Caso: `Sucesso`

```http 
Status code: 200

Content-Type: application/json


{
  "data": [
    {
      "token": "<<BASE64_TOKEN>>",
      "userId": "<<UUID>>",
      "role": "USER|ADMIN"
    }
  ],
  "error": null,
  "timestamp": "2024-01-21 12:05:23"
}
```

#### Caso: `Token de acesso inválido`

```http 
Status code: 401

Content-Type: application/json


{
  "data": null,
  "error": {
    "message": "Token de acesso fornecido é inválido.",
    "name": "AccessTokenInvalidError",
    "issues": []
  },
  "timestamp": "2024-01-21 12:05:23"
}
```

#### Caso: `Token de acesso expirado`

```http 
Status code: 401

Content-Type: application/json


{
  "data": null,
  "error": {
    "message": "Token de acesso fornecido está expirado, por favor logue-se novamente.",
    "name": "AccessTokenExpiredError",
    "issues": []
  },
  "timestamp": "2024-01-21 12:05:23"
}
```


## Enpoint: /health
### Descrição:
Este Endpoint tem como objetivo mostrar a saúde da API, se está disponível para uso. Retorna uma resposta descrevendo a saúde do sistema.

### Métodos HTTP:
- GET

### URL:
- ``http://localhost:3000/auth/health``


## Método GET:

### Exemplo de Requisição:


```http
GET http://localhost:3000/auth/health
Content-Type: application/json


{}
```


### Exemplo de Resposta:


#### Caso: `Sucesso`

```http 
Status code: 200

Content-Type: application/json


{
  "situation": "healthy",
  "details": null
}
```
