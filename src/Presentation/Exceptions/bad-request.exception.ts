import { BadRequestError } from '../Errors/http-errors';
import { AppError, HttpException } from '../Protocols';

export class BadRequestException extends HttpException {
  constructor(error?: AppError) {
    super({
      error: error ?? new BadRequestError(),
      status: 400,
    });
  }
}
