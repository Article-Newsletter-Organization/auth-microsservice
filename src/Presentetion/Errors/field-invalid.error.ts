import { AppError } from '../Protocols';

export class FieldInvalidError extends AppError {
  constructor(fieldname: string, message: string) {
    super({
      message,
      name: 'FieldInvalidError',
      target: fieldname,
    });
  }
}
