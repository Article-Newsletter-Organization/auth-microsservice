import { i18nOptions } from '../i18n/i18n.service';
import { AppError } from '../Protocols';

export class InvalidRefreshTokenError extends AppError {
  constructor(i18n: Partial<i18nOptions> = {}) {
    super({
      message: 'Refresh token is not valid',
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.InvalidRefreshTokenError',
      },
      name: 'InvalidRefreshTokenError',
    });
  }
}
