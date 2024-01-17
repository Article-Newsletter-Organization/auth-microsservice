export class UserEntity {
  id: string;
  name: string;
  username: string;
  email: string;

  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
