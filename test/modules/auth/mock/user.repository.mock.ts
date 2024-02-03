import { UserSearchDTO } from 'src/Data/Protocols/DTO';
import { Role, UserEntity } from 'src/Data/Protocols/Entities';
import { UserRepository } from 'src/Data/Repositories';

export namespace UserRepositoryMock {
  export const userEntityMock: UserEntity = {
    id: 'koifaw023-3242334-432-fawe',
    name: 'Client',
    username: 'client',
    email: 'user@mock.com',
    password: 'password',
    role: Role['ADMIN'],
  };

  export class MockClass implements Partial<UserRepository> {
    getMany = jest
      .fn()
      .mockReturnValue(Promise.resolve([UserRepositoryMock.userEntityMock]));
    getFirst = jest
      .fn()
      .mockReturnValue(Promise.resolve(UserRepositoryMock.userEntityMock));
  }
}
