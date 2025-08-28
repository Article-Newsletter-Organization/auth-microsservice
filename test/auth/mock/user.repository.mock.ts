import { UserSearchDTO } from 'src/Data/Protocols/DTO';
import { Role, UserEntity } from 'src/Data/Protocols/Entities';
import { UserRepository } from 'src/Data/Repositories';

export namespace UserRepositoryMock {
  export const userEntityMock: UserEntity = {
    id: 'koifaw023-3242334-432-fawe',
    firstName: 'Client',
    lastName: 'Da Silva',
    email: 'user@mock.com',
    password: 'password',
    phoneCountryCode: 55,
    phoneNumber: '85 9 9999-9999',
    isVerified: true,

    role: Role['ADMIN'],

    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  export class MockClass implements Partial<UserRepository> {
    getMany = jest
      .fn()
      .mockReturnValue(Promise.resolve([UserRepositoryMock.userEntityMock]));
    getFirst = jest
      .fn()
      .mockReturnValue(Promise.resolve(UserRepositoryMock.userEntityMock));
    createOne = jest
      .fn()
      .mockReturnValue(Promise.resolve(UserRepositoryMock.userEntityMock));
    updateOne = jest
      .fn()
      .mockReturnValue(Promise.resolve(UserRepositoryMock.userEntityMock));
  }
}
