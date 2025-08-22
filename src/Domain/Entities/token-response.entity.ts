import { Role } from 'src/Data/Protocols/Entities';

export class TokenResponseEntity {
  accessToken?: {
    token: string;
    expire: number;
  }
  refreshToken?: {
    token: string;
    expire: number;
  }
  userId: string;
  role: Role;
}
