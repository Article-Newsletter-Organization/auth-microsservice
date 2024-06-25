import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AuthModule from './Presentetion/Controllers/Auth/auth.module';
import { HealthModule } from './Presentetion/Controllers/Health/health.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './Presentetion/Validation/Filters';
import { LoggingModule } from './Domain/logging';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  imports: [AuthModule, HealthModule, LoggingModule],
})
export class AppModule {}
