import { CustomIsNotEmpty, CustomIsString } from '../../Decorators';

export class SignInDTO {
  @CustomIsNotEmpty()
  @CustomIsString()
  email: string;
  @CustomIsNotEmpty()
  @CustomIsString()
  password: string;
}
