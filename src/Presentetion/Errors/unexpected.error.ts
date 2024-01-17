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
        'Este e-mail não foi registrado no sistema, por favor entre em contato com o administrador do sistema.',
      name: 'UnexpectedError',
      target: attrs?.target,
      stack: attrs?.stack,
      issues: attrs?.issues,
    });
  }
}
