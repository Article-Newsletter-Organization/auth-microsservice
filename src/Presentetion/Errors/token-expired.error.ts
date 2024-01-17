import { AppError } from '../Protocols';

export class TokenExpiredError extends AppError {
  constructor() {
    super({
      message:
        'Token está fora da validade, por favor logue-se novamente no sistema.',
      name: 'TokenExpiredError',
    });
  }
}
