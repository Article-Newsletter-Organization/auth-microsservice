import { Body, Controller, Post } from '@nestjs/common';
import {
  CheckAccessTokenDTO,
  SignInDTO,
} from 'src/Presentetion/Validation/DTO';

@Controller('/auth')
export default class AuthController {
  @Post('sign-in')
  signIn(@Body() body: SignInDTO) {
    return 'É isso ai';
  }

  @Post('check-access-token')
  checkAccessToken(@Body() body: CheckAccessTokenDTO) {
    return 'É aquila coisa né';
  }
}
