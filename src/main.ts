import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './Presentation/Validation/Pipes';
import { NestHttpExceptionFilter } from './Presentation/Validation/Filters';
import { AppLoggerService } from './Domain/logging';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService(),
  });

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new NestHttpExceptionFilter());
  app.use(cookieParser());

  await app.listen(process.env['PORT'] ?? 3000);
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

bootstrap();
