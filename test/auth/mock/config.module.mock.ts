import { ConfigModule } from '@nestjs/config';

export namespace ConfigModuleMock {
  export const configData = {
    port: 3000,
    redis: {
      host: 'localhost',
      port: 6379,
      password: 'strongpassword',
    },
    bcrypt: {
      salt: 12,
    },
    jwt: {
      secret: 'secret',
      accessToken: {
        expiresIn: 3600,
        privateKey: 'privateKey',
        publicKey: 'publicKey',
      },
      refreshToken: {
        expiresIn: 2592000,
        privateKey: 'privateKey',
        publicKey: 'publicKey',
      },
    },
  };

  export const MockClass = ConfigModule.forRoot({
    isGlobal: true,
    load: [() => ConfigModuleMock.configData],
  });
}
