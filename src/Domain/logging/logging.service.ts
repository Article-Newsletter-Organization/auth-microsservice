import { Injectable, LoggerService } from '@nestjs/common';
import { winstonOptions } from 'src/Infra/winston';
import { createLogger } from 'winston';

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly logger = createLogger(winstonOptions);

  constructor() {}

  log(message: string, name: string) {
    this.logger.info(`[${name}]: ${message}`, { name });
  }

  error(message: string, name: string) {
    this.logger.error(`[${name}]: ${message}`, { name });
  }

  warn(message: string, name: string) {
    this.logger.warn(`[${name}]: ${message}`);
  }
}
