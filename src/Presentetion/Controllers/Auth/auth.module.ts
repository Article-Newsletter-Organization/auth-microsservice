import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { PrismaModule } from 'src/Infra/prisma';
import { UserRepository } from 'src/Data/Repositories';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from 'src/Infra/redis';
import config from 'src/Configuration/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [AuthModule],
})
export default class AuthModule {}
