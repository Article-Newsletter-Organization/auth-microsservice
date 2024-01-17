import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidationOptions } from 'class-validator';

export function CustomIsNotEmpty(config: ValidationOptions = {}) {
  return applyDecorators(
    IsNotEmpty({
      message: ({ property }) => {
        return `Campo ${property} não pode estar vazio.`;
      },
      ...config,
    }),
    ApiProperty(),
  );
}
