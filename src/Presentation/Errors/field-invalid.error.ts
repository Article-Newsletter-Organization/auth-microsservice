import { AppError } from '../Protocols';

export class FieldInvalidError extends AppError {
  value: any;

  constructor(
    fieldname: string,
    value: any,
    i18n: {
      key?: string;
      lang?: string;
      placeholders?: Record<string, string | number>;
    } = {},
    message: string,
  ) {
    super({
      message,
      i18n: {
        ...i18n,
        key: i18n?.key ?? 'errors.FieldInvalidError',
        placeholders: {
          fieldname,
          ...(i18n?.placeholders ? i18n.placeholders : {}),
        },
      },
      name: 'FieldInvalidError',
      target: fieldname,
    });
    this.value = value;
  }

  getHttpReponse(
    issuesFormatter?: (issues: AppError[]) => (object | number | string)[],
  ) {
    return {
      message: this.message,
      name: this.name,
      target: this.target,
      value: this.value,
      stack: this.stack,
      issues:
        issuesFormatter && this.issues.length > 0
          ? issuesFormatter(this.issues)
          : this.issuesFormatter(this.issues),
    };
  }
}
