import { AppError } from "src/Presentetion/Protocols";

export class BadRequestError extends AppError {
  constructor() {
    super({
      message: 'Ocorreu um erro ao receber a requisição, por favor tente novamente.',
      name: 'BadRequestError',
    });
  }
}
