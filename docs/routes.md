## Endpoint: /sign-in
### Description:
This endpoint aims to allow the user to retrieve their credentials to enable requests with high privilege.

### HTTP Methods:
- POST

### URL:
- ``http://localhost:3000/auth/sign-in``


## POST Method:

### Request Example:


```http
POST http://localhost:3000/auth/sign-in
Content-Type: application/json


{
  "email": "test@example.com",
  "password": "strongpassword"
}
```


### Response Example:


#### Case: `Success`

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

#### Case: `Incorrect Email or Password`

```http 
Status code: 401

Content-Type: application/json


{
  "data": null,
  "error": {
    "message": "Incorrect email or password.",
    "name": "CredentialMissmatchError",
    "issues": []
  },
  "timestamp": "2024-01-21 12:05:23"
}
```


## Endpoint: /check-access-token
### Description:
This endpoint aims to check if the provided access token is valid and retrieve its information.

### HTTP Methods:
- POST

### URL:
- ``http://localhost:3000/auth/check-access-token``


## POST Method:

### Request Example:


```http
POST http://localhost:3000/auth/check-access-token
Content-Type: application/json


{
  "token": "<<BASE64_TOKEN>>"
}
```


### Response Example:


#### Case: `Success`

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

#### Case: `Invalid Access Token`

```http 
Status code: 401

Content-Type: application/json


{
  "data": null,
  "error": {
    "message": "Provided access token is invalid.",
    "name": "AccessTokenInvalidError",
    "issues": []
  },
  "timestamp": "2024-01-21 12:05:23"
}
```

#### Case: `Expired Access Token`

```http 
Status code: 401

Content-Type: application/json


{
  "data": null,
  "error": {
    "message": "Provided access token has expired, please log in again.",
    "name": "AccessTokenExpiredError",
    "issues": []
  },
  "timestamp": "2024-01-21 12:05:23"
}
```


## Endpoint: /health
### Description:
This endpoint aims to show the health of the API, if it's available for use. It returns a response describing the system's health.

### HTTP Methods:
- GET

### URL:
- ``http://localhost:3000/auth/health``


## GET Method:

### Request Example:


```http
GET http://localhost:3000/auth/health
Content-Type: application/json


{}
```


### Response Example:


#### Case: `Success`

```http 
Status code: 200

Content-Type: application/json


{
  "situation": "healthy",
  "details": null
}
```