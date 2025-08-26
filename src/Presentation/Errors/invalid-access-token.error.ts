import { AppError } from '../Protocols';

export class InvalidAccessTokenError extends AppError {
  constructor(
    i18n: {
      key?: string;
      lang?: string;
      placeholders?: Record<string, string | number>;
    } = {},
  ) {
    super({
      message: 'Access token given is not valid.',
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.InvalidAccessTokenError',
      },
      name: 'InvalidAccessTokenError',
    });
  }
}
