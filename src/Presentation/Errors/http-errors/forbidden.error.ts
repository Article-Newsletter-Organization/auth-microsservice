import { AppError } from "src/Presentation/Protocols";

export class ForbiddenError extends AppError {
  constructor() {
    super({
      message: 'Esta rota proibiu sua requisição.',
      name: 'ForbiddenError',
    });
  }
}
