import { applyDecorators } from '@nestjs/common';
import { IsString, ValidationOptions } from 'class-validator';

type CustomIsStringOptions = ValidationOptions;

export function CustomIsString(config: CustomIsStringOptions = {}) {
  return applyDecorators(
    IsString({
      message: ({ property }) => {
        return `Campo ${property} precisa ser do tipo texto.`;
      },
      ...config,
    }),
  );
}
