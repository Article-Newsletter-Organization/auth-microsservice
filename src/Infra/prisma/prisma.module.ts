import { Module } from '@nestjs/common';
import { PrismaHelper, PrismaHelperSingleton } from './prisma.helper';

@Module({
  providers: [
    {
      provide: PrismaHelper,
      useValue: PrismaHelperSingleton.getInstance(),
    },
  ],
  exports: [
    {
      provide: PrismaHelper,
      useValue: PrismaHelperSingleton.getInstance(),
    },
  ],
})
export class PrismaModule {}
