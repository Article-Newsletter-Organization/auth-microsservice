import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { PrismaHelper } from 'src/Infra/prisma';

@Injectable()
export class HealthRepository {
  private readonly logger = new Logger(HealthRepository.name);

  constructor(
    private readonly prismaHelper: PrismaHelper,
    private configService: ConfigService,
  ) {}

  async checkDatabaseConnection(): Promise<'ok' | 'error'> {
    try {
      await this.prismaHelper.$queryRaw`SELECT 1`;

      return 'ok';
    } catch (e) {
      this.logger.error(`Database healthcheck error: ${e.message}`);
      return 'error';
    }
  }

  async checkCacheConnection(): Promise<'ok' | 'error'> {
    const redis = new Redis({
      host: this.configService.get<string>('redis.host'),
      port: this.configService.get<number>('redis.port'),
      password: this.configService.get<string>('redis.password'),
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });

    try {
      await redis.connect();
      await redis.ping();

      return 'ok';
    } catch (e) {
      this.logger.error(`Redis healthcheck error: ${e.message}`);
      return 'error';
    } finally {
      await redis.quit();
    }
  }
}
