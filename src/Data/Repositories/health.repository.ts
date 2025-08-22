import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { PrismaHelper } from 'src/Infra/prisma';

@Injectable()
export class HealthRepository {
  private readonly logger = new Logger(HealthRepository.name);
  private redis: Redis;

  constructor(
    private readonly prismaHelper: PrismaHelper,
    private configService: ConfigService,
  ) {
    this.redis = new Redis({
      host: this.configService.get<string>(`redis.host`),
      port: this.configService.get<number>(`redis.port`),
      password: this.configService.get<string>(`redis.password`),
    });
  }

  async checkDatabaseConnection(): Promise<'ok' | 'error'> {
    try {
      await this.prismaHelper.$queryRaw`SELECT 1`;

      return 'ok';
    } catch (e) {
      this.logger.error(e);
      return 'error';
    }
  }

  async checkCacheConnection(): Promise<'ok' | 'error'> {
    try {
      await this.redis.ping();

      return 'ok';
    } catch (e) {
      this.logger.error(e);
      return 'error';
    }
  }
}
