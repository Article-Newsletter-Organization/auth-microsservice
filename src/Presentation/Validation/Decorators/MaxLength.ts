import { applyDecorators } from '@nestjs/common';
import { MaxLength, ValidationOptions } from 'class-validator';

type CustomOptions = ValidationOptions;

export function CustomMaxLength(
  length: number,
  { context, ...config }: CustomOptions = {},
) {
  return applyDecorators(
    MaxLength(length, {
      message: ({ property }) => {
        return `Property ${property} must not have more than ${length} caracteres.`;
      },
      context: {
        ...(context ? context : {}),
        key: 'validation.CustomIsDate',
      },
      ...config,
    }),
  );
}
