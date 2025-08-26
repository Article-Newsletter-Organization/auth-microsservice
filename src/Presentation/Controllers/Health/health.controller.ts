import { Controller, Get, Res } from '@nestjs/common';
import { HealthService } from './health.service';
import { Response } from 'express';

@Controller('/health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get('liveness')
  getLivenessInfo() {
    return {
      status: 'ok',
    };
  }

  @Get('readiness')
  async getReadinessInfo(@Res() res: Response) {
    const checks = await this.service.checkAllDependencies();

    const allHealthy = Object.values(checks).every((v) => v === 'ok');

    if (allHealthy) {
      res.status(200).json({ status: 'ok', checks });
    } else {
      res.status(503).json({ status: 'error', checks });
    }
  }
}
