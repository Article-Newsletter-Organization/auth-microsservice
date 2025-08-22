import { ForbiddenError } from '../Errors/http-errors';
import { AppError, HttpException } from '../Protocols';

export class ForbiddenException extends HttpException {
  constructor(error?: AppError) {
    super({
      error: error ?? new ForbiddenError(),
      status: 403,
    });
  }
}
