import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDate, ValidationOptions } from 'class-validator';

export function CustomIsDate(config: ValidationOptions = {}) {
  return applyDecorators(
    IsDate({
      message: ({ property }) => {
        return `Campo ${property} precisa ter um formato de data válida.`;
      },
      ...config,
    }),
    Transform(({ value }) => value && new Date(value)),
  );
}
