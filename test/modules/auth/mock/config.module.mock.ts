import { ConfigModule } from '@nestjs/config';

export namespace ConfigModuleMock {
  export const configData = {
    port: 3000,
    redis: {
      host: 'localhost',
      port: 6379,
    },
    bcrypt: {
      salt: 12,
    },
    jwt: {
      secret: 'secret',
      expiresIn: 3600,
    },
  };

  export const MockClass = ConfigModule.forRoot({
    isGlobal: true,
    load: [() => ConfigModuleMock.configData],
  });
}
