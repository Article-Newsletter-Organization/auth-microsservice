import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from './jwt.service';

@Module({
  exports: [JwtModule, JwtService],
  imports: [
    ConfigModule,
    NestJwtModule.register({
      global: true,
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  providers: [JwtService],
})
export class JwtModule {}
