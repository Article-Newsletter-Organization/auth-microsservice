import { AppError } from '../Protocols';

export class UnexpectedError extends AppError {
  constructor(attrs?: {
    message?: string;
    target?: string;
    stack?: string;
    issues?: AppError[];
  }) {
    super({
      message:
        attrs.message ??
        'Ocorreu um erro inesperado.',
      name: 'UnexpectedError',
      target: attrs?.target,
      stack: attrs?.stack,
      issues: attrs?.issues,
    });
  }
}
