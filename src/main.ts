import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './Presentation/Validation/Pipes';
import {
  HttpExceptionFilter,
  NestHttpExceptionFilter,
} from './Presentation/Validation/Filters';
import { AppLoggerService } from './Domain/logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService()
  });

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new NestHttpExceptionFilter());

  await app.listen(process.env['PORT'] ?? 3000);
}
bootstrap();
