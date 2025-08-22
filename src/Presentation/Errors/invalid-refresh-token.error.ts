import { AppError } from '../Protocols';

export class InvalidRefreshTokenError extends AppError {
  constructor() {
    super({
      message:
        'Este refresh token não é válido.',
      name: 'InvalidRefreshTokenError',
    });
  }
}
