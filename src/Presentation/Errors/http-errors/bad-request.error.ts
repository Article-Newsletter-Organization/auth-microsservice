import { i18nOptions } from 'src/Presentation/i18n/i18n.service';
import { AppError } from 'src/Presentation/Protocols';

export class BadRequestError extends AppError {
  constructor(i18n: Partial<i18nOptions> = {}) {
    super({
      message:
        'An error has occured in this request, please review again the data given.',
      i18n: { ...i18n, key: i18n?.key ?? 'errors.BadRequestError' },
      name: 'BadRequestError',
    });
  }
}
