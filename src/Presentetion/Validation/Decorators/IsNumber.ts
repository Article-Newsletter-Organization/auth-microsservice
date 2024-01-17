import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber, ValidationOptions } from 'class-validator';

export function CustomIsNumber(config: ValidationOptions = {}) {
  return applyDecorators(
    IsNumber(
      { maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false },
      {
        message: ({ property }) => {
          return `Campo ${property} precisa possuir um formato de número válido.`;
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
