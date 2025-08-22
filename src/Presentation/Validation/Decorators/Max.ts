import { applyDecorators } from '@nestjs/common';
import { Max, ValidationOptions } from 'class-validator';

type CustomOptions = ValidationOptions;

export function CustomMax(length: number, config: CustomOptions = {}) {
  return applyDecorators(
    Max(length, {
      message: ({ property }) => {
        return `Campo ${property} pode ser contado até no máximo ${length}.`;
      },
      ...config,
    }),
  );
}
