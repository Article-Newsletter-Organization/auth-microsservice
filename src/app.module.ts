import { Module } from '@nestjs/common';
import AuthModule from './Presentetion/Controllers/Auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
