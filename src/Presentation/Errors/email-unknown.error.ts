import { AppError } from '../Protocols';

export class EmailUnknownError extends AppError {
  constructor(
    i18n: {
      key?: string;
      lang?: string;
      placeholders?: Record<string, string | number>;
    } = {},
  ) {
    super({
      message:
        'This mail is not registered in the system, please contact the system administrator.',
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.EmailUnknownError',
      },
      name: 'EmailUnknownError',
    });
  }
}
