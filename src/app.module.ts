import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AuthModule from './Presentation/Controllers/Auth/auth.module';
import { HealthModule } from './Presentation/Controllers/Health/health.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './Presentation/Validation/Filters';
import { LoggingModule } from './Domain/logging';
import {
  LoggingMiddleware,
  MetricsMiddleware,
} from './Presentation/Middleware';
import { I18nModule } from './Presentation/i18n/i18n.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  imports: [AuthModule, HealthModule, LoggingModule, I18nModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');

    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
