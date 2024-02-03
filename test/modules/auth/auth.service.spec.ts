import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from 'src/Infra/bcrypt';
import AuthService from 'src/Presentetion/Controllers/Auth/auth.service';
import {
  BcryptServiceMock,
  CacheManagerMock,
  ConfigModuleMock,
  JwtServiceMock,
  UserRepositoryMock,
} from './mock';
import { UserRepository } from 'src/Data/Repositories';
import { JwtService } from 'src/Infra/jwt';
import { ForbiddenException } from 'src/Presentetion/Exceptions';
import { EmailOrPasswordInvalidError } from 'src/Presentetion/Errors';

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
