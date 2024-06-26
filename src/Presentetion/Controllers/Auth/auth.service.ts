import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { api } from '@opentelemetry/sdk-node';
import { TraceSpanActive } from 'src/Configuration/Decorators/span-active.decorator';
import { TraceSpan } from 'src/Configuration/Decorators/span.decorator';
import { UserEntity } from 'src/Data/Protocols/Entities';
import { UserRepository } from 'src/Data/Repositories';
import {
  AccessTokenEntity,
  AccessTokenPayloadEntity,
} from 'src/Domain/Entities';
import { BcryptService } from 'src/Infra/bcrypt';
import { JwtService } from 'src/Infra/jwt';
import {
  EmailOrPasswordInvalidError,
  TokenExpiredError,
} from 'src/Presentetion/Errors';
import { ForbiddenException, UnauthorizedException } from 'src/Presentetion/Exceptions';
import { SignInDTO } from 'src/Presentetion/Validation/DTO';

@Injectable()
export default class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
  ) {}

  @TraceSpan("Sign In Service")
  async signIn(dto: SignInDTO): Promise<AccessTokenEntity> {
    const user = await this.userRepository.getFirst({
      email: dto.email,
    });

    if (!user) {
      throw new ForbiddenException(new EmailOrPasswordInvalidError());
    }

    const matchPassword = this.bcryptService.hashCompare(
      user.password,
      dto.password,
    );

    if (!matchPassword) {
      throw new ForbiddenException(new EmailOrPasswordInvalidError());
    }

    const accessToken = await this.jwtService.encrypt(
      this.makeTokenPayloadForUserEntity(user),
    );

    this.cacheManager.set(user.id, accessToken);

    return {
      expire: this.configService.get<number>('jwt.expiresIn'),
      token: accessToken,
      userId: user.id,
      role: user.role,
    };
  }

  async checkAccessToken(
    accessToken: string,
  ): Promise<Omit<AccessTokenEntity, 'expire'>> {
    const payload = await this.jwtService.decrypt(accessToken);
    const cacheToken = this.cacheManager.get(payload.uid);

    if (!cacheToken) {
      throw new UnauthorizedException(new TokenExpiredError());
    }

    return {
      role: payload.role,
      userId: payload.uid,
      token: accessToken,
    };
  }

  makeTokenPayloadForUserEntity(user: UserEntity): AccessTokenPayloadEntity {
    return {
      role: user.role,
      uid: user.id,
    };
  }
}
