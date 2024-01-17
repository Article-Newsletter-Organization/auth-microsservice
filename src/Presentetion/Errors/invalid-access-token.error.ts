import { AppError } from '../Protocols';

export class InvalidAccessTokenError extends AppError {
  constructor() {
    super({
      message:
        'Este Token de acesso não é válido.',
      name: 'InvalidAccessTokenError',
    });
  }
}
