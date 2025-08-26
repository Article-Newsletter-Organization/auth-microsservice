import { applyDecorators } from '@nestjs/common';
import { IsObject, ValidationOptions } from 'class-validator';

export function CustomIsObject({ context, ...config }: ValidationOptions = {}) {
  return applyDecorators(
    IsObject({
      message: ({ property }) => {
        return `Property ${property} must be an key-value object.`;
      },
      context: {
        ...(context ? context : {}),
        key: 'validation.CustomIsObject',
      },
      ...config,
    }),
  );
}
