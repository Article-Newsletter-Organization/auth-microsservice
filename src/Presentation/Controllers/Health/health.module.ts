import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { HealthRepository } from 'src/Data/Repositories';
import { PrismaModule } from 'src/Infra/prisma';
import { HealthService } from './health.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [HealthRepository, HealthService],
  controllers: [HealthController],
  exports: [HealthModule],
})
export class HealthModule {}
