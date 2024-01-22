import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { PrismaModule } from 'src/Infra/prisma';
import { UserRepository } from 'src/Data/Repositories';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [AuthModule],
})
export default class AuthModule {}
