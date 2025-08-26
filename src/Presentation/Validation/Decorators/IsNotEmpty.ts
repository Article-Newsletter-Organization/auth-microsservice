import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidationOptions } from 'class-validator';

export function CustomIsNotEmpty({
  context,
  ...config
}: ValidationOptions = {}) {
  return applyDecorators(
    IsNotEmpty({
      message: ({ property }) => {
        return `Property ${property} must not be empty.`;
      },
      context: {
        ...(context ? context : {}),
        key: 'validation.CustomIsNotEmpty',
      },
      ...config,
    }),
    ApiProperty(),
  );
}
