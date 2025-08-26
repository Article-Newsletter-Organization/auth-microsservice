import { AppError } from '../Protocols';

export class CookieMissingError extends AppError {
  constructor(
    cookieName: string,
    i18n: {
      key?: string;
      lang?: string;
      placeholders?: Record<string, string | number>;
    } = {},
  ) {
    super({
      message: `Cookie "${cookieName}" is mandatory.`,
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.CookieMissingError',
        placeholders: {
          cookieName,
          ...(i18n?.placeholders ? i18n.placeholders : {}),
        },
      },
      name: 'CookieMissingError',
      target: cookieName,
    });
  }
}
