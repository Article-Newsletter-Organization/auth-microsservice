import { i18nOptions } from 'src/Presentation/i18n/i18n.service';
import { AppError } from 'src/Presentation/Protocols';

export class UnauthorizedError extends AppError {
  constructor(i18n: Partial<i18nOptions> = {}) {
    super({
      message: 'Credentials given are not authorized.',
      i18n: { ...i18n, key: i18n?.key ?? 'errors.UnauthorizedError' },
      name: 'UnauthorizedError',
    });
  }
}
