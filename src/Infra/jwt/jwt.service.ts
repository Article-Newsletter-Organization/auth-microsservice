import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayloadEntity } from 'src/Domain/Entities';
import { InternalException } from 'src/Presentetion/Exceptions';
import { InvalidAccessTokenError } from 'src/Presentetion/Errors';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  async encrypt(payload: AccessTokenPayloadEntity): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payload, {
        expiresIn: `${this.configService.get<string>(`jwt.expiresIn`)}s`,
      });

      return token;
    } catch (error) {
      console.log(error);
      throw new InternalException();
    }
  }

  async decrypt(ciphertext: string): Promise<AccessTokenPayloadEntity> {
    try {
      const payload =
        await this.jwtService.verifyAsync<AccessTokenPayloadEntity>(ciphertext);
      return payload;
    } catch (error) {
      console.log(error);
      throw new InternalException();
    }
  }
}
