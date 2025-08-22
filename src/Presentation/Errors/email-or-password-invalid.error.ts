import { AppError } from '../Protocols';

export class EmailOrPasswordInvalidError extends AppError {
  constructor() {
    super({
      message: 'E-mail ou senha inválidos.',
      name: 'EmailOrPasswordInvalidError',
    });
  }
}
