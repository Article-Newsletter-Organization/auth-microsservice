import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthController {
  @Get()
  getSituation() {
    return {
      situation: 'healthy',
      details: null,
    };
  }
}
