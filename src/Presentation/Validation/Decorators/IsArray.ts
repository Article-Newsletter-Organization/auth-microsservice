import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsArray, ValidationOptions } from 'class-validator';

export function CustomIsArray({ context, ...config }: ValidationOptions = {}) {
  return applyDecorators(
    Transform(({ value }) => {
      return value != undefined && value.length > 0 ? value : [];
    }),
    IsArray({
      message: ({ property }) => {
        return `Property "${property}" must be a list of items.`;
      },
      context: {
        ...(context ? context : {}),
        key: 'validation.CustomIsArray',
      },
      ...config,
    }),
  );
}
