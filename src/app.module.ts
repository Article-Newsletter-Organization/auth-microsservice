import { Module } from '@nestjs/common';
import AuthModule from './Presentetion/Controllers/Auth/auth.module';
import { HealthModule } from './Presentetion/Controllers/Health/health.module';

@Module({
  imports: [AuthModule, HealthModule],
})
export class AppModule {}
