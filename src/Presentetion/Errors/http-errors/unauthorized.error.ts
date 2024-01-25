import { AppError } from "src/Presentetion/Protocols";

export class UnauthorizedError extends AppError {
  constructor() {
    super({
      message: 'Ocorreu um erro ao pedir autorização.',
      name: 'UnauthorizedError',
    });
  }
}
