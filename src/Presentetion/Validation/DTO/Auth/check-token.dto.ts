import { CustomIsNotEmpty, CustomIsString } from '../../Decorators';

export class CheckAccessTokenDTO {
  @CustomIsNotEmpty()
  @CustomIsString()
  token: string;
}
