import {
  Body,
  Controller,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  CheckAccessTokenDTO,
  SignInDTO,
} from 'src/Presentetion/Validation/DTO';
import AuthService from './auth.service';
import { ResponseLoggerInterceptor } from 'src/Presentetion/Interceptors';
import { GLOBAL_LOGGER_NAME } from 'src/Configuration/const';

@Controller('/auth')
@UseInterceptors(ResponseLoggerInterceptor)
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
