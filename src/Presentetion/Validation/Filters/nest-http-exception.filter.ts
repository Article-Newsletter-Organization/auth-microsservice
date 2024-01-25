import {
  ArgumentsHost,
  Catch,
  HttpException as NestHttpException,
  NotFoundException as NestNotFoundException,
} from '@nestjs/common';
import {
  InternalException,
  NotFoundException,
} from 'src/Presentetion/Exceptions';
import { HttpException } from 'src/Presentetion/Protocols';
import { Request, Response } from 'express';

@Catch(NestHttpException)
export class NestHttpExceptionFilter {
  catch(exception: NestHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let httpException: HttpException = new InternalException();

    if (exception instanceof NestNotFoundException) {
      httpException = new NotFoundException();
    }
    
    return response.status(httpException.status).json({
      data: null,
      error: httpException.getHttpReponse().error,
      timestamp: new Date().toISOString(),
    });
  }
}
