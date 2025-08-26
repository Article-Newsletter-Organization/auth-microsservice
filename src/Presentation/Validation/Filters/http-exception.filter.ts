import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { HttpException } from 'src/Presentation/Protocols';
import { Response } from 'express';
import { I18nService } from 'src/Presentation/i18n/i18n.service';

@Catch(HttpException)
export class HttpExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  private readonly i18nService = I18nService.getInstance();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.locals.exception = exception;

    this.logger.error(exception);

    return response.status(exception.status).json({
      data: null,
      error: exception.error.getHttpReponse(undefined, response.cookie['lang']),
      timestamp: new Date().toISOString(),
    });
  }
}
