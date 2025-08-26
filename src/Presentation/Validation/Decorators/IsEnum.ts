import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEnum, ValidationOptions } from 'class-validator';

export function CustomIsEnum({
  enumType,
  context,
  ...config
}: ValidationOptions & {
  enumType?: object;
} = {}) {
  const enumOptions = Object.values(enumType);
  return applyDecorators(
    Transform(({ value }) => {
      return value != undefined && value.length > 0 ? value : [];
    }),
    IsEnum(enumType, {
      message: ({ property }) => {
        return `Property "${property}" must contain one of the follow items values: ${enumOptions}.`;
      },
      context: {
        ...(context ? context : {}),
        items: enumOptions,
        key: 'validation.CustomIsEnum',
      },
      ...config,
    }),
  );
}
