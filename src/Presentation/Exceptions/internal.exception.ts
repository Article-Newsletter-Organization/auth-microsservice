import { UnexpectedError } from '../Errors';
import { AppError, HttpException } from '../Protocols';

export class InternalException extends HttpException {
  constructor(
    attrs: {
      error?: AppError;
      stack?: string;
      target?: string;
      issues?: AppError[];
    } = {},
  ) {
    super({
      error:
        attrs.error ??
        new UnexpectedError({
          issues: attrs.issues,
          target: attrs.target,
          stack: attrs.stack,
        }),
      status: 500,
    });
  }
}
