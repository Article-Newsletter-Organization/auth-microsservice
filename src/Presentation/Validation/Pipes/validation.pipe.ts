import { ValidationPipe } from '@nestjs/common';
import { InvalidFieldCompositeError } from 'src/Presentation/Errors';
import { BadRequestException } from 'src/Presentation/Exceptions';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory(errors) {
        const issues = errors.map((error) => {
          return {
            message: Object.values(error.constraints)[0],
            fieldname: error.property,
            value: error.value,
            i18n: {
              key:
                error.contexts[0]?.key ?? 'fallback.validationWithoutMessage',
              placeholders: {
                ...error.contexts[0]?.placeholders,
                property: error.property,
              },
            },
          };
        });

        throw new BadRequestException(new InvalidFieldCompositeError(issues));
      },
    });
  }
}
