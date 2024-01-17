import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidationOptions } from 'class-validator';

export function CustomIsOptional(config: ValidationOptions = {}) {
  return applyDecorators(
    IsOptional({
      message: ({ property }) => {
        return `Campo ${property} é opcional.`;
      },
      ...config
    }),
    ApiProperty(),
  );
}
