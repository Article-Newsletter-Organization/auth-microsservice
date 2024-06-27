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
import { Response } from 'express';
import { SpanStatusCode, context, trace } from '@opentelemetry/api';

@Catch(NestHttpException)
export class NestHttpExceptionFilter {
  private readonly tracer = trace.getTracer('HttpExceptionFilter');

  catch(exception: NestHttpException, host: ArgumentsHost) {
    const span = this.tracer.startSpan(
      `Nest Http Exception Handler`,
      {
        attributes: {
          'exception.handler': NestHttpExceptionFilter.name,
          'exception.type': exception.constructor.name,
          'exception.message': exception.message,
        },
      },
      context.active(),
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let httpException: HttpException = new InternalException({
      stack: exception.message,
    });

    if (exception instanceof NestNotFoundException) {
      httpException = new NotFoundException();
    }

    response.locals.exception = httpException;
    response.status(httpException.status).json({
      data: null,
      error: httpException.getHttpReponse().error,
      timestamp: new Date().toISOString(),
    });

    span.recordException(exception);
    span.setStatus({ code: SpanStatusCode.ERROR, message: exception.message });
    span.end();

    return response;
  }
}
