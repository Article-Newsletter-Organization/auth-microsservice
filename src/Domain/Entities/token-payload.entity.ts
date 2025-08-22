import { Role } from 'src/Data/Protocols/Entities';

export class TokenPayloadEntity {
  uid: string;
  role: Role;
  email: string;
  ex: number;
}
