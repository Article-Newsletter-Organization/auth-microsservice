import { Role } from "../../Entities";

export class UserSearchDTO {
  id?: string;
  name: string;
  username: string;
  email: string;

  role: Role;
}
