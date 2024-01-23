import { Role } from 'src/Data/Protocols/Entities';

export class AccessTokenEntity {
  token: string;
  expire: number;
  userId: string;
  role: Role;
}
