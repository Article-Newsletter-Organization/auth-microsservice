import { i18nOptions } from '../i18n/i18n.service';
import { AppError } from '../Protocols';

export class UserAlreadyExistsError extends AppError {
  constructor(i18n: Partial<i18nOptions> = {}) {
    super({
      message: 'There is already a user with this data in the system.',
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.UserAlreadyExistsError',
      },
      name: 'UserAlreadyExistsError',
    });
  }
}
