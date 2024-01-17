import { ValidationPipe } from '@nestjs/common';
import {
  FieldInvalidError,
  InvalidFieldCompositeError,
} from 'src/Presentetion/Errors';
import { BadRequestException } from 'src/Presentetion/Exceptions';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory(errors) {
        const issues = errors.map((error) => {
          return {
            fieldname: error.property,
            value: error.value,
            message: Object.values(error.constraints)[0],
          };
        });

        throw new BadRequestException(new InvalidFieldCompositeError(issues));
      },
    });
  }
}
