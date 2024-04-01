import { Metrics } from './../../Domain/logging/log.model';
import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    next();
    res.on('finish', () => {
      const exactPath = req.originalUrl.replace(req.baseUrl, '');
      const { metrics, exception } = res.locals;

      if (!metrics) {
        return;
      }

      
      this.logger.log(`Request done on ${exactPath}`, LoggingMiddleware.name, {
        metrics,
        exception,
      });
    });
  }
}
