import { NotFoundError } from '../Errors/http-errors';
import { AppError, HttpException } from '../Protocols';

export class NotFoundException extends HttpException {
  constructor(error?: AppError) {
    super({
      error: error ?? new NotFoundError(),
      status: 404,
    });
  }
}
