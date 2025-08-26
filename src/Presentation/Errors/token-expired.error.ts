import { i18nOptions } from '../i18n/i18n.service';
import { AppError } from '../Protocols';

export class TokenExpiredError extends AppError {
  constructor(i18n: Partial<i18nOptions> = {}) {
    super({
      message: 'Token is expired',
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.TokenExpiredError',
      },
      name: 'TokenExpiredError',
    });
  }
}
