import { applyDecorators } from '@nestjs/common';
import { MaxLength, ValidationOptions } from 'class-validator';

type CustomOptions = ValidationOptions;

export function CustomMaxLength(length: number, config: CustomOptions = {}) {
  return applyDecorators(
    MaxLength(length, {
      message: ({ property }) => {
        return `Campo ${property} precisa ter no máximo ${length} caractéres.`;
      },
      ...config,
    }),
  );
}
