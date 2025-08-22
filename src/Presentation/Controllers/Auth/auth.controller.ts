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
} from 'src/Presentation/Validation/DTO';
import AuthService from './auth.service';
import { ResponseLoggerInterceptor } from 'src/Presentation/Interceptors';
import { CreatedResponse, OkResponse } from 'src/Presentation/Responses';
import { SignUpDTO } from 'src/Presentation/Validation/DTO/Auth/sign-up.dto';

@Controller('/auth')
@UseInterceptors(ResponseLoggerInterceptor)
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInDTO) {
    const result = await this.authService.signIn(body);
    return new OkResponse({
      data: result,
    });
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO) {
    const result = await this.authService.signUp(body);
    return new CreatedResponse({
      data: result
    });
  }

  @Post('check-access-token')
  async checkAccessToken(@Body() { token }: CheckAccessTokenDTO) {
    const result = await this.authService.checkAccessToken(token);
    return new OkResponse({
      data: result,
    });
  }
}
