import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AuthModule from './Presentetion/Controllers/Auth/auth.module';
import { HealthModule } from './Presentetion/Controllers/Health/health.module';
import { LoggingModule } from './Domain/logging';

@Module({
  imports: [AuthModule, HealthModule, LoggingModule],
})
export class AppModule {}
