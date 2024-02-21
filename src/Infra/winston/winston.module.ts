import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './winstonOptions';

@Module({
  imports: [WinstonModule.forRoot(winstonOptions)],
  exports: [WinstonModule],
})
export class AppWinstonModule {}
