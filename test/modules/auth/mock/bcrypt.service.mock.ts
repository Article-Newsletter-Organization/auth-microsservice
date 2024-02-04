import { BcryptService } from 'src/Infra/bcrypt';

export namespace BcryptServiceMock {
  export class MockClass implements Partial<BcryptService> {
    hash = jest.fn().mockReturnValue(Promise.resolve('hash'));
    hashCompare = jest.fn().mockReturnValue(true);
  }
}
