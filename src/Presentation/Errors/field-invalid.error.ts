import { AppError } from '../Protocols';

export class FieldInvalidError extends AppError {
  value: any;

  constructor(fieldname: string, value: any, message: string) {
    super({
      message,
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
