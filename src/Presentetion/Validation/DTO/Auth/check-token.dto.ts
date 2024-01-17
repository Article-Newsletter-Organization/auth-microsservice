import { Role } from 'src/Domain/Entities';

export class CheckAccessTokenDTO {
  token: string;
  role?: Role;
}
