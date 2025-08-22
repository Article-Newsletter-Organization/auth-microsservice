import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role, UserEntity } from 'src/Data/Protocols/Entities';
import { UserRepository } from 'src/Data/Repositories';
import { TokenResponseEntity, TokenPayloadEntity } from 'src/Domain/Entities';
import { BcryptService } from 'src/Infra/bcrypt';
import { JwtService } from 'src/Infra/jwt';
import {
  EmailOrPasswordInvalidError,
  InvalidAccessTokenError,
  TokenExpiredError,
  UserAlreadyExistsError,
} from 'src/Presentation/Errors';
import {
  BadRequestException,
  ForbiddenException,
  InternalException,
  UnauthorizedException,
} from 'src/Presentation/Exceptions';
import { SignInDTO } from 'src/Presentation/Validation/DTO';
import { SignUpDTO } from 'src/Presentation/Validation/DTO/Auth/sign-up.dto';

@Injectable()
export default class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(dto: SignInDTO): Promise<TokenResponseEntity> {
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
    const refreshToken = await this.jwtService.encrypt(
      this.makeTokenPayloadForUserEntity(user),
      'refresh-token',
    );

    this.userRepository.updateOne(user.id, {
      refreshToken,
    });

    this.cacheManager.set(user.id, accessToken);

    return {
      accessToken: {
        expire: this.configService.get<number>('jwt.accessToken.expiresIn'),
        token: accessToken,
      },
      refreshToken: {
        expire: this.configService.get<number>('jwt.refreshToken.expiresIn'),
        token: refreshToken,
      },
      userId: user.id,
      role: user.role,
    };
  }

  async signUp(dto: SignUpDTO): Promise<TokenResponseEntity> {
    const getResult = await this.userRepository.getFirst({
      email: dto.email,
    });

    if (getResult) {
      throw new BadRequestException(new UserAlreadyExistsError());
    }

    const hash = await this.bcryptService.hash(dto.password);

    const user = await this.userRepository.createOne({
      ...dto,
      password: hash,
      isVerified: false,
      role: Role.USER,
    });

    if (!user) {
      throw new InternalException();
    }

    const accessToken = await this.jwtService.encrypt(
      this.makeTokenPayloadForUserEntity(user),
    );
    const refreshToken = await this.jwtService.encrypt(
      this.makeTokenPayloadForUserEntity(user, "refresh-token"),
      'refresh-token',
    );

    this.userRepository.updateOne(user.id, {
      refreshToken,
    });

    this.cacheManager.set(user.id, accessToken);

    return {
      accessToken: {
        expire: this.configService.get<number>('jwt.accessToken.expiresIn'),
        token: accessToken,
      },
      refreshToken: {
        expire: this.configService.get<number>('jwt.refreshToken.expiresIn'),
        token: refreshToken,
      },
      userId: user.id,
      role: user.role,
    };
  }

  async checkAccessToken(
    accessToken: string,
  ): Promise<Omit<TokenResponseEntity, 'expire'>> {
    const payload = await this.jwtService.decrypt(accessToken);
    const cacheToken = await this.cacheManager.get(payload.uid);

    if (!cacheToken) {
      throw new UnauthorizedException(new TokenExpiredError());
    }

    if (accessToken !== cacheToken) {
      throw new UnauthorizedException(new InvalidAccessTokenError());
    }

    return {
      accessToken: {
        expire: this.configService.get<number>('jwt.accessToken.expiresIn'),
        token: accessToken,
      },
      role: payload.role,
      userId: payload.uid,
    };
  }

  makeTokenPayloadForUserEntity(user: UserEntity, type: "access-token" | "refresh-token" = "access-token"): TokenPayloadEntity {
    return {
      role: user.role,
      uid: user.id,
      email: user.email,
      ex: this.configService.get<number>(`jwt.${type == "access-token" ? "accessToken" : "refreshToken" }.expiresIn`)
    };
  }
}
