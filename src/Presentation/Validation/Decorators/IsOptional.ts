import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidationOptions } from 'class-validator';

export function CustomIsOptional({
  context,
  ...config
}: ValidationOptions = {}) {
  return applyDecorators(
    IsOptional({
      message: ({ property }) => {
        return `Property ${property} is opcional.`;
      },
      context: {
        ...(context ? context : {}),
        key: 'validation.CustomIsOptional',
      },
      ...config,
    }),
    ApiProperty(),
  );
}
