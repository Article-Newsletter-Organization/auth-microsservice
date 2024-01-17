import { AppError } from "src/Presentetion/Protocols";

export class ForbiddenError extends AppError {
  constructor() {
    super({
      message: 'Esta rota proibiu sua requisição.',
      name: 'ForbiddenError',
    });
  }
}
