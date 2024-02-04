import { AppError } from './error';

export abstract class HttpException extends Error {
  status: number;
  error: AppError;

  constructor(attrs: { status: number; error: AppError }) {
    super(attrs.error.message);
    this.status = attrs.status;
    this.error = attrs.error;
  }

  toString() {
    return `Exception ${this.status}: ${
      this.error.message
    } - ${Date.now().toString()}`;
  }

  getHttpReponse(
    issuesFormatter?: (issues: AppError[]) => (object | number | string)[],
  ) {
    return {
      status: this.status,
      error: this.error.getHttpReponse(),
    };
  }
}
