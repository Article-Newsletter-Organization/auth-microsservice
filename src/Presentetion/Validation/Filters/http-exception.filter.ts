import { ArgumentsHost, Catch } from '@nestjs/common';
import {
  InternalException,
  NotFoundException,
} from 'src/Presentetion/Exceptions';
import { HttpException } from 'src/Presentetion/Protocols';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return response.status(exception.status).json({
      data: null,
      error: exception.getHttpReponse().error,
      timestamp: new Date().toISOString(),
    });
  }
}
