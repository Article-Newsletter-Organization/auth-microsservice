import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { readFileSync } from 'fs';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from './jwt.service';
import * as path from 'path';

const privateKeyPath = path.join(
  __dirname,
  '../../../',
  'src/Configuration',
  'keys',
  'private_key.pem',
);
const publicKeyPath = path.join(
  __dirname,
  '../../../',
  'src/Configuration',
  'keys',
  'public_key.pem',
);

const privateKey = readFileSync(privateKeyPath, 'utf8');
const publicKey = readFileSync(publicKeyPath, 'utf8');

@Module({
  exports: [JwtModule, JwtService],
  imports: [
    ConfigModule,
    NestJwtModule.register({
      global: true,
      privateKey,
      publicKey,
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  providers: [JwtService],
})
export class JwtModule {}
