export class UserEntity {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;

  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
