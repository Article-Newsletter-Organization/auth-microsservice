import { AppError } from 'src/Presentation/Protocols';

export class ForbiddenError extends AppError {
  constructor(
    i18n: {
      key?: string;
      lang?: string;
      placeholders?: Record<string, string | number>;
    } = {},
  ) {
    super({
      message: 'This route has blocked your access.',
      i18n: { ...i18n, key: i18n?.key ?? 'errors.ForbiddenError' },
      name: 'ForbiddenError',
    });
  }
}
