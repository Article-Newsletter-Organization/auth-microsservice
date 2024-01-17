import { AppError } from '../Protocols';

export class HeaderMissingError extends AppError {
  constructor(header: string) {
    super({
      message: `Header "${header}" é obrigatório.`,
      name: 'HeaderMissingError',
      target: header,
    });
  }
}
