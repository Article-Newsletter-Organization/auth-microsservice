import { applyDecorators } from '@nestjs/common';
import { IsString, ValidationOptions } from 'class-validator';

type CustomIsStringOptions = ValidationOptions;

export function CustomIsString({
  context,
  ...config
}: CustomIsStringOptions = {}) {
  return applyDecorators(
    IsString({
      message: ({ property }) => {
        return `Property ${property} must be a text.`;
      },
      context: {
        ...(context ? context : {}),
        key: 'validation.CustomIsString',
      },
      ...config,
    }),
  );
}
