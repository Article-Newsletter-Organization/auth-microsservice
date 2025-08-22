import { Body, Controller, Get, Post, Res, UseInterceptors } from '@nestjs/common';
import {
  SignInDTO,
  SignUpDTO
} from 'src/Presentation/Validation/DTO';
import AuthService from './auth.service';
import { ResponseLoggerInterceptor } from 'src/Presentation/Interceptors';
import { CreatedResponse, OkResponse } from 'src/Presentation/Responses';
import { BearerToken, Cookie } from 'src/Presentation/Decorators';
import { UnauthorizedException } from 'src/Presentation/Exceptions';
import { CookieMissingError, HeaderMissingError } from 'src/Presentation/Errors';
import { Response } from 'express';

@Controller('/auth')
@UseInterceptors(ResponseLoggerInterceptor)
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInDTO, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.signIn(body);

    res.cookie('refresh-token', result.refreshToken.token, {
      httpOnly: true,   
      secure: true,     
      sameSite: 'strict', 
      maxAge: result.refreshToken.expire, 
    })

    return new OkResponse({
      data: result,
    });
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.signUp(body);

    res.cookie('refresh-token', result.refreshToken.token, {
      httpOnly: true,   
      secure: true,     
      sameSite: 'strict', 
      maxAge: result.refreshToken.expire, 
    })

    return new CreatedResponse({
      data: result,
    });
  }

  @Get('check-access-token')
  async checkAccessToken(@BearerToken() token?: string) {
    if (!token)
      throw new UnauthorizedException(
        new HeaderMissingError('Authorization: Bearer'),
      );

    const result = await this.authService.checkAccessToken(token);
    return new OkResponse({
      data: result,
    });
  }

  @Get('refresh-token')
  async refreshToken(@Cookie("refresh-token") token?: string) {
    if (!token)
      throw new UnauthorizedException(
        new CookieMissingError('refresh-token'),
      );

    const result = await this.authService.refreshToken(token);
    return new OkResponse({
      data: result,
    });
  }
}
