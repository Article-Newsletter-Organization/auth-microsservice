import { AppError } from '../Protocols';

export class EmailOrPasswordInvalidError extends AppError {
  constructor(
    i18n: {
      key?: string;
      lang?: string;
      placeholders?: Record<string, string | number>;
    } = {},
  ) {
    super({
      message: 'Email or password is invalid.',
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.EmailOrPasswordInvalidError',
      },
      name: 'EmailOrPasswordInvalidError',
    });
  }
}
