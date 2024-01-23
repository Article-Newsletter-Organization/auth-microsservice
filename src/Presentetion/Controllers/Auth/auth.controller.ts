import { Body, Controller, Post } from '@nestjs/common';
import {
  CheckAccessTokenDTO,
  SignInDTO,
} from 'src/Presentetion/Validation/DTO';
import AuthService from './auth.service';

@Controller('/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body);
  }

  @Post('check-access-token')
  checkAccessToken(@Body() { token }: CheckAccessTokenDTO) {
    return this.authService.checkAccessToken(token);
  }
}
