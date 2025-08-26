import { i18nOptions } from '../i18n/i18n.service';
import { AppError } from '../Protocols';

export class UnexpectedError extends AppError {
  constructor(
    attrs: {
      target?: string;
      stack?: string;
      issues?: AppError[];
    } = {},
    i18n: Partial<i18nOptions> = {},
  ) {
    super({
      message: 'An unexpected error has occured.',
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.UnexpectedError',
      },
      name: 'UnexpectedError',
      target: attrs?.target,
      stack: attrs?.stack,
      issues: attrs?.issues,
    });
  }
}
