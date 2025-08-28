import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from 'src/Infra/bcrypt';
import AuthService from 'src/Presentation/Controllers/Auth/auth.service';
import {
  BcryptServiceMock,
  CacheManagerMock,
  ConfigModuleMock,
  JwtServiceMock,
  UserRepositoryMock,
} from './mock';
import { UserRepository } from 'src/Data/Repositories';
import { JwtService } from 'src/Infra/jwt';
import {
  BadRequestException,
  ForbiddenException,
  InternalException,
  UnauthorizedException,
} from 'src/Presentation/Exceptions';
import {
  EmailOrPasswordInvalidError,
  InvalidAccessTokenError,
  TokenExpiredError,
  UserAlreadyExistsError,
} from 'src/Presentation/Errors';
import { Role } from 'src/Data/Protocols/Entities';

describe('AuthService', () => {
  let authService: AuthService;
  let cacheManagerMock: CacheManagerMock.MockClass;
  let userRepositoryMock: UserRepositoryMock.MockClass;
  let jwtServiceMock: JwtServiceMock.MockClass;
  let bcryptServiceMock: BcryptServiceMock.MockClass;

  beforeEach(async () => {
    cacheManagerMock = new CacheManagerMock.MockClass();
    userRepositoryMock = new UserRepositoryMock.MockClass();
    jwtServiceMock = new JwtServiceMock.MockClass();
    bcryptServiceMock = new BcryptServiceMock.MockClass();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModuleMock.MockClass],
      providers: [
        AuthService,
        { provide: BcryptService, useValue: bcryptServiceMock },
        { provide: CACHE_MANAGER, useValue: cacheManagerMock },
        { provide: UserRepository, useValue: userRepositoryMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });

    it('should throw EmailOrPasswordInvalidError with ForbiddenException for signIn with a non-existent email', async () => {
      userRepositoryMock.getFirst.mockImplementation(() => null);

      await expect(
        authService.signIn({
          email: 'nonexistent@example.com',
          password: 'password',
        }),
      ).rejects.toThrow(
        new ForbiddenException(new EmailOrPasswordInvalidError()),
      );

      expect(userRepositoryMock.getFirst).toHaveBeenCalledWith({
        email: 'nonexistent@example.com',
      });
    });

    it('should throw EmailOrPasswordInvalidError with ForbiddenException for signIn with a wrong password', async () => {
      bcryptServiceMock.hashCompare.mockImplementation(() => {
        return false;
      });

      await expect(
        authService.signIn({
          email: 'user@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(
        new ForbiddenException(new EmailOrPasswordInvalidError()),
      );

      expect(bcryptServiceMock.hashCompare).toHaveBeenCalledWith(
        'password',
        'wrongpassword',
      );
    });

    it('should return AccessTokenEntity data when everything is working correctly', async () => {
      jwtServiceMock.encrypt
        .mockReturnValueOnce('fakeAccessToken')
        .mockReturnValueOnce('fakeRefreshToken');

      const result = await authService.signIn({
        email: 'user@example.com',
        password: 'password',
      });

      expect(result).toEqual({
        accessToken: {
          expire: ConfigModuleMock.configData.jwt.accessToken.expiresIn,
          token: 'fakeAccessToken',
        },
        refreshToken: {
          expire: ConfigModuleMock.configData.jwt.refreshToken.expiresIn,
          token: 'fakeRefreshToken',
        },
        userId: UserRepositoryMock.userEntityMock.id,
        role: UserRepositoryMock.userEntityMock.role,
      });
    });
  });

  describe('signUp', () => {
    const signUpDtoMock = {
      email: UserRepositoryMock.userEntityMock.email,
      password: UserRepositoryMock.userEntityMock.password,
      firstName: UserRepositoryMock.userEntityMock.firstName,
      lastName: UserRepositoryMock.userEntityMock.lastName,
      phoneCountryCode: UserRepositoryMock.userEntityMock.phoneCountryCode,
      phoneNumber: UserRepositoryMock.userEntityMock.phoneNumber,
    };

    it('should be defined', () => {
      expect(authService).toBeDefined();
    });

    it('should throw UserAlreadyExistsError with BadRequestException if user already exists', async () => {
      userRepositoryMock.getFirst.mockImplementation(
        () => UserRepositoryMock.userEntityMock,
      );

      await expect(authService.signUp(signUpDtoMock)).rejects.toThrow(
        new BadRequestException(new UserAlreadyExistsError()),
      );

      expect(userRepositoryMock.getFirst).toHaveBeenCalledWith({
        email: UserRepositoryMock.userEntityMock.email,
      });
    });

    it('should throw InternalException if user creation fails', async () => {
      userRepositoryMock.getFirst.mockImplementation(() => null);
      bcryptServiceMock.hash.mockImplementation(() => 'hashedPassword');
      userRepositoryMock.createOne.mockImplementation(() => null);

      await expect(authService.signUp(signUpDtoMock)).rejects.toThrow(
        new InternalException(),
      );

      expect(userRepositoryMock.createOne).toHaveBeenCalled();
    });

    it('should return AccessTokenEntity data when everything is working correctly', async () => {
      userRepositoryMock.getFirst.mockImplementation(() => null);
      bcryptServiceMock.hash.mockImplementation(() => 'hashedPassword');
      userRepositoryMock.createOne.mockImplementation(
        () => UserRepositoryMock.userEntityMock,
      );
      jwtServiceMock.encrypt
        .mockReturnValueOnce('fakeAccessToken')
        .mockReturnValueOnce('fakeRefreshToken');

      const result = await authService.signUp({
        email: UserRepositoryMock.userEntityMock.email,
        password: UserRepositoryMock.userEntityMock.password,
        firstName: UserRepositoryMock.userEntityMock.firstName,
        lastName: UserRepositoryMock.userEntityMock.lastName,
        phoneCountryCode: UserRepositoryMock.userEntityMock.phoneCountryCode,
        phoneNumber: UserRepositoryMock.userEntityMock.phoneNumber,
      });

      expect(result).toEqual({
        accessToken: {
          expire: ConfigModuleMock.configData.jwt.accessToken.expiresIn,
          token: 'fakeAccessToken',
        },
        refreshToken: {
          expire: ConfigModuleMock.configData.jwt.refreshToken.expiresIn,
          token: 'fakeRefreshToken',
        },
        userId: UserRepositoryMock.userEntityMock.id,
        role: UserRepositoryMock.userEntityMock.role,
      });

      expect(userRepositoryMock.updateOne).toHaveBeenCalledWith(
        UserRepositoryMock.userEntityMock.id,
        { refreshToken: 'fakeRefreshToken' },
      );

      expect(cacheManagerMock.set).toHaveBeenCalledWith(
        UserRepositoryMock.userEntityMock.id,
        'fakeAccessToken',
      );
    });
  });

  describe('checkAccessToken', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });

    it('should throw UnauthorizedException with TokenExpiredError when token is not in cache', async () => {
      jwtServiceMock.decrypt.mockImplementation(() => ({
        uid: UserRepositoryMock.userEntityMock.id,
        role: UserRepositoryMock.userEntityMock.role,
      }));
      cacheManagerMock.get.mockImplementation(() => null);

      await expect(
        authService.checkAccessToken('expiredToken'),
      ).rejects.toThrow(new UnauthorizedException(new TokenExpiredError()));

      expect(jwtServiceMock.decrypt).toHaveBeenCalledWith('expiredToken');
      expect(cacheManagerMock.get).toHaveBeenCalledWith(
        UserRepositoryMock.userEntityMock.id,
      );
    });

    it('should throw UnauthorizedException with InvalidAccessTokenError when token does not match cached token', async () => {
      jwtServiceMock.decrypt.mockImplementation(() => ({
        uid: UserRepositoryMock.userEntityMock.id,
        role: UserRepositoryMock.userEntityMock.role,
      }));
      cacheManagerMock.get.mockImplementation(() => 'differentToken');

      await expect(
        authService.checkAccessToken('invalidToken'),
      ).rejects.toThrow(
        new UnauthorizedException(new InvalidAccessTokenError()),
      );

      expect(cacheManagerMock.get).toHaveBeenCalledWith(
        UserRepositoryMock.userEntityMock.id,
      );
    });

    it('should return token data when everything is valid', async () => {
      jwtServiceMock.decrypt.mockImplementation(() => ({
        uid: UserRepositoryMock.userEntityMock.id,
        role: UserRepositoryMock.userEntityMock.role,
      }));
      cacheManagerMock.get.mockImplementation(() => 'validToken');

      const result = await authService.checkAccessToken('validToken');

      expect(result).toEqual({
        accessToken: {
          expire: ConfigModuleMock.configData.jwt.accessToken.expiresIn,
          token: 'validToken',
        },
        role: UserRepositoryMock.userEntityMock.role,
        userId: UserRepositoryMock.userEntityMock.id,
      });

      expect(jwtServiceMock.decrypt).toHaveBeenCalledWith('validToken');
      expect(cacheManagerMock.get).toHaveBeenCalledWith(
        UserRepositoryMock.userEntityMock.id,
      );
    });
  });

  describe('refreshToken', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });

    it('should throw UnauthorizedException with InvalidAccessTokenError if user not found', async () => {
      jwtServiceMock.decrypt.mockImplementation(() => ({
        uid: '123',
        role: Role['USER'],
        exp: Math.floor(Date.now() / 1000) + 60,
      }));
      userRepositoryMock.getFirst.mockImplementation(() => null);

      await expect(
        authService.refreshToken('invalidRefreshToken'),
      ).rejects.toThrow(
        new UnauthorizedException(new InvalidAccessTokenError()),
      );

      expect(jwtServiceMock.decrypt).toHaveBeenCalledWith(
        'invalidRefreshToken',
        'refresh-token',
      );
      expect(userRepositoryMock.getFirst).toHaveBeenCalledWith({ id: '123' });
    });

    it('should throw UnauthorizedException with InvalidAccessTokenError if refreshToken does not match user.refreshToken', async () => {
      jwtServiceMock.decrypt.mockImplementation(() => ({
        uid: UserRepositoryMock.userEntityMock.id,
        role: UserRepositoryMock.userEntityMock.role,
        exp: Math.floor(Date.now() / 1000) + 60,
      }));
      userRepositoryMock.getFirst.mockImplementation(() => ({
        ...UserRepositoryMock.userEntityMock,
        refreshToken: 'differentRefreshToken',
      }));

      await expect(
        authService.refreshToken('refreshTokenSentByClient'),
      ).rejects.toThrow(
        new UnauthorizedException(new InvalidAccessTokenError()),
      );

      expect(userRepositoryMock.getFirst).toHaveBeenCalledWith({
        id: UserRepositoryMock.userEntityMock.id,
      });
    });

    it('should throw UnauthorizedException with TokenExpiredError if refreshToken is expired', async () => {
      jwtServiceMock.decrypt.mockImplementation(() => ({
        uid: UserRepositoryMock.userEntityMock.id,
        role: UserRepositoryMock.userEntityMock.role,
        exp: Math.floor(Date.now() / 1000) - 10, // já expirado
      }));
      userRepositoryMock.getFirst.mockImplementation(() => ({
        ...UserRepositoryMock.userEntityMock,
        refreshToken: 'validRefreshToken',
      }));

      await expect(
        authService.refreshToken('validRefreshToken'),
      ).rejects.toThrow(new UnauthorizedException(new TokenExpiredError()));
    });

    it('should return new accessToken when refreshToken is valid and not expired', async () => {
      const validExp = Math.floor(Date.now() / 1000) + 60; // exp futuro
      jwtServiceMock.decrypt.mockImplementation(() => ({
        uid: UserRepositoryMock.userEntityMock.id,
        role: UserRepositoryMock.userEntityMock.role,
        exp: validExp,
      }));
      userRepositoryMock.getFirst.mockImplementation(() => ({
        ...UserRepositoryMock.userEntityMock,
        refreshToken: 'validRefreshToken',
      }));
      jwtServiceMock.encrypt.mockReturnValue('newAccessToken');

      const result = await authService.refreshToken('validRefreshToken');

      expect(result).toEqual({
        accessToken: {
          expire: ConfigModuleMock.configData.jwt.accessToken.expiresIn,
          token: 'newAccessToken',
        },
        role: UserRepositoryMock.userEntityMock.role,
        userId: UserRepositoryMock.userEntityMock.id,
      });

      expect(cacheManagerMock.set).toHaveBeenCalledWith(
        UserRepositoryMock.userEntityMock.id,
        'newAccessToken',
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
