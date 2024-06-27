import { ArgumentsHost, Catch } from '@nestjs/common';
import { HttpException } from 'src/Presentetion/Protocols';
import { Response } from 'express';
import { SpanStatusCode, context, trace } from '@opentelemetry/api';

@Catch(HttpException)
export class HttpExceptionFilter {
  private readonly tracer = trace.getTracer('HttpExceptionFilter');

  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const span = this.tracer.startSpan(
      `Http Exception Handler`,
      {
        attributes: {
          'exception.handler': HttpExceptionFilter.name,
          'exception.type': exception.constructor.name,
          'exception.message': exception.message,
        },
      },
      context.active(),
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.locals.exception = exception;
    response.status(exception.status).json({
      data: null,
      error: exception.getHttpReponse().error,
      timestamp: new Date().toISOString(),
    });

    span.recordException(exception);
    span.setStatus({ code: SpanStatusCode.ERROR, message: exception.message });
    span.end();

    return response;
  }
}
