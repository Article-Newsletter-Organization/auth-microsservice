import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BearerToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');

    return type === 'Bearer' && token ? token : undefined;
  },
);
