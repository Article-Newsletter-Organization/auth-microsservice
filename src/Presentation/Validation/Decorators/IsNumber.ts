import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber, ValidationOptions } from 'class-validator';

export function CustomIsNumber({ context, ...config }: ValidationOptions = {}) {
  return applyDecorators(
    IsNumber(
      { maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false },
      {
        message: ({ property }) => {
          return `Property ${property} must have a valid number format.`;
        },
        context: {
          ...(context ? context : {}),
          key: 'validation.CustomIsNumber',
        },
        ...config,
      },
    ),
    Transform(({ value }) => {
      if (value) {
        return parseInt(value);
      }
      return value;
    }),
  );
}
