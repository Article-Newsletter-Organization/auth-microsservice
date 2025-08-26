import { i18nOptions } from 'src/Presentation/i18n/i18n.service';
import { AppError } from 'src/Presentation/Protocols';

export class NotFoundError extends AppError {
  constructor(i18n: Partial<i18nOptions> = {}) {
    super({
      message: 'Route not found, try a different route.',
      i18n: { ...i18n, key: i18n?.key ?? 'errors.NotFoundError' },
      name: 'NotFoundError',
    });
  }
}
