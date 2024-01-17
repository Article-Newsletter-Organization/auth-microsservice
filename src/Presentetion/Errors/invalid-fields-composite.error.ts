import { AppError } from '../Protocols';
import { FieldInvalidError } from './field-invalid.error';

export class InvalidFieldCompositeError extends AppError {
  constructor(
    issues: {
      fieldname: string;
      message: string;
    }[],
    message?: string,
  ) {
    super({
      message: message ?? 'Ocorreu erros na validação dos campos!',
      name: 'InvalidFieldCompositeError',
      issues: issues.map((issue) => {
        return new FieldInvalidError(issue.fieldname, issue.message);
      }),
    });
  }
}
