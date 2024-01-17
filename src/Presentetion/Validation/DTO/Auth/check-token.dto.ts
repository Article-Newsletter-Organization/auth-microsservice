import { Role } from 'src/Data/Protocols/Entities';

export class CheckAccessTokenDTO {
  token: string;
  role?: Role;
}
