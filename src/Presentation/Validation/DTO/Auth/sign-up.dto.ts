import {
  CustomIsNotEmpty,
  CustomIsNumber,
  CustomIsString,
  CustomMax,
  CustomMaxLength,
} from '../../Decorators';

export class SignUpDTO {
  @CustomIsNotEmpty()
  @CustomIsString()
  email: string;
  @CustomIsNotEmpty()
  @CustomIsString()
  password: string;
  @CustomIsNotEmpty()
  @CustomIsString()
  @CustomMaxLength(100)
  firstName: string;
  @CustomIsNotEmpty()
  @CustomIsString()
  @CustomMaxLength(100)
  lastName: string;
  @CustomIsNotEmpty()
  @CustomIsNumber()
  @CustomMax(999)
  phoneCountryCode: number;
  @CustomIsNotEmpty()
  @CustomIsString()
  @CustomMaxLength(50)
  phoneNumber: string;
}
