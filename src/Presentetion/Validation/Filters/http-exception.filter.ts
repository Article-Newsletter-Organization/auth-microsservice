import { ArgumentsHost, Catch, Inject } from '@nestjs/common';
import {
  InternalException,
  NotFoundException,
} from 'src/Presentetion/Exceptions';
import { HttpException } from 'src/Presentetion/Protocols';
import { Request, Response } from 'express';
import { AppLoggerService } from 'src/Domain/logging';

@Catch(HttpException)
export class HttpExceptionFilter {
  constructor(
    @Inject(AppLoggerService) private readonly loggerService: AppLoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.locals.exception = exception;

    return response.status(exception.status).json({
      data: null,
      error: exception.getHttpReponse().error,
      timestamp: new Date().toISOString(),
    });
  }
}
