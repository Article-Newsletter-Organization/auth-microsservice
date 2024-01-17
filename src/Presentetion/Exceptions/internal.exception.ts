import { UnexpectedError } from '../Errors';
import { AppError, HttpException } from '../Protocols';

export class InternalException extends HttpException {
  constructor(error?: AppError) {
    super({
      error: error ?? new UnexpectedError(),
      status: 500,
    });
  }
}
