import { Injectable, LoggerService } from '@nestjs/common';
import { winstonOptions } from 'src/Infra/winston';
import { HttpException } from 'src/Presentetion/Protocols';
import { createLogger } from 'winston';
import { LogModel } from './log.model';

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly logger = createLogger(winstonOptions);

  constructor() {}

  log(message: string, name: string, extra: LogModel) {
    this.logger.info(`[${name}]: ${message}`, { name, ...extra });
  }

  error(message: string, name: string, extra: LogModel) {
    this.logger.error(`[${name}]: ${message}`, { name, ...extra });
  }

  warn(message: string, name: string) {
    this.logger.warn(`[${name}]: ${message}`);
  }
}
