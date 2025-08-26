import { applyDecorators } from '@nestjs/common';
import { Max, ValidationOptions } from 'class-validator';

type CustomOptions = ValidationOptions;

export function CustomMax(
  length: number,
  { context, ...config }: CustomOptions = {},
) {
  return applyDecorators(
    Max(length, {
      message: ({ property }) => {
        return `Property ${property} must not be greater than ${length}.`;
      },
      context: {
        ...(context ? context : {}),
        key: 'validation.CustomMax',
        length,
      },
      ...config,
    }),
  );
}
