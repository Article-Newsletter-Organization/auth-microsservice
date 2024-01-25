import { UnauthorizedError } from '../Errors/http-errors';
import { AppError, HttpException } from '../Protocols';

export class UnauthorizedException extends HttpException {
  constructor(error?: AppError) {
    super({
      error: error ?? new UnauthorizedError(),
      status: 401,
    });
  }
}
