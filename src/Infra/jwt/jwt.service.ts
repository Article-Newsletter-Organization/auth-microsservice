import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadEntity } from 'src/Domain/Entities';
import {
  InternalException,
  UnauthorizedException,
} from 'src/Presentation/Exceptions';
import { InvalidAccessTokenError } from 'src/Presentation/Errors';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  async encrypt(
    payload: TokenPayloadEntity,
    type: 'access-token' | 'refresh-token' = 'access-token',
  ): Promise<string> {
    try {
      let token: string;

      if (type === 'access-token') {
        token = await this.jwtService.signAsync(payload, {
          expiresIn: `${this.configService.get<string>(
            `jwt.accessToken.expiresIn`,
          )}s`,
          privateKey: this.configService.get<string>(
            `jwt.accessToken.privateKey`,
          ),
        });
      } else {
        token = await this.jwtService.signAsync(payload, {
          expiresIn: `${this.configService.get<string>(
            `jwt.refreshToken.expiresIn`,
          )}s`,
          privateKey: this.configService.get<string>(
            `jwt.refreshToken.privateKey`,
          ),
        });
      }

      return token;
    } catch (e) {
      throw new InternalException({
        stack: e,
      });
    }
  }

  async decrypt(
    ciphertext: string,
    type: 'access-token' | 'refresh-token' = 'access-token',
  ): Promise<TokenPayloadEntity> {
    try {
      let payload: TokenPayloadEntity;

      if (type === 'access-token') {
        payload = await this.jwtService.verifyAsync<TokenPayloadEntity>(
          ciphertext,
          {
            publicKey: this.configService.get<string>(
              `jwt.accessToken.publicKey`,
            ),
          },
        );
      } else {
        payload = await this.jwtService.verifyAsync<TokenPayloadEntity>(
          ciphertext,
          {
            publicKey: this.configService.get<string>(
              `jwt.refreshToken.publicKey`,
            ),
          },
        );
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException(new InvalidAccessTokenError());
    }
  }
}
