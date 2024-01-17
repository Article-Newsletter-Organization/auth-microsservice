import { Role } from 'src/Data/Protocols/Entities';

export class AccessTokenPayloadEntity {
  uid: string;
  authorId: string;
  role: Role;
}
