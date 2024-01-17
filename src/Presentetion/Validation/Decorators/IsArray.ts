import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsArray, ValidationOptions } from 'class-validator';

export function CustomIsArray(config: ValidationOptions = {}) {
  return applyDecorators(
    Transform(({ value }) => {
      return value != undefined && value.length > 0 ? value : [];
    }),
    IsArray({
      message: ({ property }) => {
        return `Campo "${property}" precisa ser uma lista de itens.`;
      },
      ...config,
    }),
  );
}
