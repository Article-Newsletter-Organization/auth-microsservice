import { Injectable } from '@nestjs/common';
import { HealthRepository } from 'src/Data/Repositories';

@Injectable()
export class HealthService {
  constructor(private repository: HealthRepository) {}

  async checkAllDependencies() {
    const checks: Record<string, string> = {};

    checks.database = await this.repository.checkDatabaseConnection();
    checks.cache = await this.repository.checkCacheConnection();

    return checks;
  }
}
