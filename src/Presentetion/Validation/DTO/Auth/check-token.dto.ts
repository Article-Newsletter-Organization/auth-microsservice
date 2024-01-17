import { Role } from 'src/Domain/Entities';

export class CheckTokenHeaderDTO {
  token: string;
  role: Role;
}
