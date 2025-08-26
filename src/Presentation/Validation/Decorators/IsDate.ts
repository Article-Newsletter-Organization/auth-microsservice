import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDate, ValidationOptions } from 'class-validator';

export function CustomIsDate({ context, ...config }: ValidationOptions = {}) {
  return applyDecorators(
    IsDate({
      message: ({ property }) => {
        return `Property ${property} must have a valid date format.`;
      },
      context: {
        ...(context ? context : {}),
        key: 'validation.CustomIsDate',
      },
      ...config,
    }),
    Transform(({ value }) => value && new Date(value)),
  );
}
