import { AppError } from '../Protocols';

export class UserAlreadyExistsError extends AppError {
  constructor(message?: string) {
    super({
      message: message ?? 'Já existe um usuário cadastrado com esses dados.',
      name: 'UserAlreadyExistsError',
    });
  }
}
