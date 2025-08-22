export class UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneCountryCode: number;
  phoneNumber: string;
  profilePicture?: string;
  isVerified: boolean;
  
  role: Role;
  
  createdAt: Date;
  modifiedAt: Date; 
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
