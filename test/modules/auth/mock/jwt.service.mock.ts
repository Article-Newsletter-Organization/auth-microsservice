import { Role } from '@prisma/client';
import { AccessTokenPayloadEntity } from 'src/Domain/Entities';
import { JwtService } from 'src/Infra/jwt';

export namespace JwtServiceMock {
  export class MockClass implements Partial<JwtService> {
    encrypt = jest.fn().mockReturnValue(Promise.resolve('ciphertext'));
    decrypt = jest.fn().mockReturnValue(
      Promise.resolve({
        uid: '<uuid>',
        role: Role['ADMIN'],
      }),
    );
  }
}
