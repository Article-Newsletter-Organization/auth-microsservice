import { AppError } from "src/Presentation/Protocols";

export class BadRequestError extends AppError {
  constructor() {
    super({
      message: 'Ocorreu um erro ao receber a requisição, por favor tente novamente.',
      name: 'BadRequestError',
    });
  }
}
