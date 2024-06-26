import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayloadEntity } from 'src/Domain/Entities';
import {
  InternalException,
  UnauthorizedException,
} from 'src/Presentetion/Exceptions';
import { InvalidAccessTokenError } from 'src/Presentetion/Errors';
import { TraceSpan } from 'src/Configuration/Decorators/span.decorator';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  @TraceSpan('Encrypt JWT Payload')
  async encrypt(payload: AccessTokenPayloadEntity): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payload, {
        expiresIn: `${this.configService.get<string>(`jwt.expiresIn`)}s`,
        privateKey: this.configService.get<string>(`jwt.privateKey`),
      });

      return token;
    } catch (e) {
      throw new InternalException({
        stack: e,
      });
    }
  }

  @TraceSpan('Decrypt JWT Token')
  async decrypt(ciphertext: string): Promise<AccessTokenPayloadEntity> {
    try {
      const payload =
        await this.jwtService.verifyAsync<AccessTokenPayloadEntity>(
          ciphertext,
          {
            publicKey: this.configService.get<string>(`jwt.publicKey`),
          },
        );
      return payload;
    } catch (error) {
      throw new UnauthorizedException(new InvalidAccessTokenError());
    }
  }
}
