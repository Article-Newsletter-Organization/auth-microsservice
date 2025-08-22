import { AppError } from "src/Presentation/Protocols";

export class UnauthorizedError extends AppError {
  constructor() {
    super({
      message: 'Ocorreu um erro ao pedir autorização.',
      name: 'UnauthorizedError',
    });
  }
}
