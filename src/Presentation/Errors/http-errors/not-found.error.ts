import { AppError } from 'src/Presentation/Protocols';

export class NotFoundError extends AppError {
  constructor() {
    super({
      message: 'Rota não encontrada, tente outra rota.',
      name: 'NotFoundError',
    });
  }
}
