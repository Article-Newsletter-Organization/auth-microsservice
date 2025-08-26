import { i18nOptions } from '../i18n/i18n.service';
import { AppError } from '../Protocols';
import { FieldInvalidError } from './field-invalid.error';

export class InvalidFieldCompositeError extends AppError {
  constructor(
    issues: {
      message: string;
      fieldname: string;
      value: any;
      i18n?: Partial<i18nOptions>;
    }[],
    i18n: Partial<i18nOptions> = {},
  ) {
    super({
      message: 'There were errors validating the fields!',
      i18n: {
        key: i18n?.key ?? 'errors.InvalidFieldCompositeError',
        ...i18n,
      },
      name: 'InvalidFieldCompositeError',
      issues: issues.map((issue) => {
        return new FieldInvalidError(
          issue.fieldname,
          issue.value,
          issue.i18n,
          issue.message,
        );
      }),
    });
  }
}
