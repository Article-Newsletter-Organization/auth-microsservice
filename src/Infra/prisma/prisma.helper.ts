import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaHelper extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

export class PrismaHelperSingleton {
  static instance: PrismaHelper | null = null;

  static getInstance() {
    if (!PrismaHelperSingleton.instance) {
      const instance = new PrismaHelper();
      PrismaHelperSingleton.instance = instance;

      return instance;
    }

    return PrismaHelperSingleton.instance;
  }
}
