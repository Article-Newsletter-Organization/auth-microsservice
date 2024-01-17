import { applyDecorators } from '@nestjs/common';
import { IsObject, ValidationOptions } from 'class-validator';

export function CustomIsObject(config: ValidationOptions = {}) {
  return applyDecorators(
    IsObject({
      message: ({ property }) => {
        return `Campo ${property} precisa ser um objeto de chave-valor.`;
      },
      ...config,
    }),
  );
}
