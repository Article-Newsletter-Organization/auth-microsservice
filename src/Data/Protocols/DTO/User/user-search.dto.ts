import { Role } from "../../Entities";

export class UserSearchDTO {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneCountryCode?: number;
  phoneNumber?: string;
  profilePicture?: string;
  isVerified?: boolean;

  role?: Role;

  
  createdAt?: Date;
  modifiedAt?: Date; 
}
