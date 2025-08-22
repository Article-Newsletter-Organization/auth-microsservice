import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEnum, ValidationOptions } from 'class-validator';

export function CustomIsEnum({
  enumType,
  ...config
}: ValidationOptions & {
  enumType?: object;
} = {}) {
  return applyDecorators(
    Transform(({ value }) => {
      return value != undefined && value.length > 0 ? value : [];
    }),
    IsEnum(enumType, {
      message: ({ property }) => {
        return `Campo "${property}" precisa conter um dos seguintes itens: ${Object.values(
          enumType,
        )}.`;
      },
      ...config,
    }),
  );
}
