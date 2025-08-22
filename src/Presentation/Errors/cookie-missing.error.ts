import { AppError } from '../Protocols';

export class CookieMissingError extends AppError {
  constructor(cookieName: string) {
    super({
      message: `Cookie "${cookieName}" é obrigatório.`,
      name: 'CookieMissingError',
      target: cookieName,
    });
  }
}
