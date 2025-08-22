import { AppError } from '../Protocols';

export class EmailUnknownError extends AppError {
  constructor() {
    super({
      message:
        'Este e-mail não foi registrado no sistema, por favor entre em contato com o administrador do sistema.',
      name: 'EmailUnknownError',
    });
  }
}
