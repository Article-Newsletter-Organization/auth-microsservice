import { Module } from '@nestjs/common';
import { AppLoggerService } from './logging.service';

@Module({
  providers: [AppLoggerService],
  exports: [LoggingModule, AppLoggerService],
})
export class LoggingModule {}
