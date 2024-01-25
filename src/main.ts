import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './Presentetion/Validation/Pipes';
import { HttpExceptionFilter, NestHttpExceptionFilter } from './Presentetion/Validation/Filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new NestHttpExceptionFilter());

  await app.listen(process.env['PORT'] ?? 3000);
}
bootstrap();
