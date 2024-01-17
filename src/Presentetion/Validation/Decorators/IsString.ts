import { applyDecorators } from '@nestjs/common';
import { IsString, ValidationOptions } from 'class-validator';

export function CustomIsString(config: ValidationOptions = {}) {
  return applyDecorators(
    IsString({
      message: ({ property }) => {
        return `Campo ${property} precisa ser do tipo texto.`;
      },
      ...config
    }),
  );
}
