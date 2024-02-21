import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as os from 'os';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();
    const memoryUsageStart = process.memoryUsage();

    res.on('finish', () => {
      const end = process.hrtime(start);
      const durationInMilliseconds = end[0] * 1000 + end[1] / 1000000;

      const memoryUsageEnd = process.memoryUsage();
      const memoryUsageDiff = {
        rss: memoryUsageEnd.rss - memoryUsageStart.rss,
        heapTotal: memoryUsageEnd.heapTotal - memoryUsageStart.heapTotal,
        heapUsed: memoryUsageEnd.heapUsed - memoryUsageStart.heapUsed,
        external: memoryUsageEnd.external - memoryUsageStart.external,
      };

      res.locals.metrics = {
        requestUrl: req.originalUrl,
        requestPath: req.originalUrl.replace(req.baseUrl, ''),
        responseTime: durationInMilliseconds,
        statusCode: res.statusCode,
        responseSize: res.getHeader('Content-Length') || 0,
        memoryUsage: memoryUsageDiff,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
      };
    });

    next();
  }
}
