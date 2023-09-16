import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { TUser } from '../types';

export const CurrentUser = createParamDecorator(
  (
    data: keyof TUser | undefined,
    ctx: ExecutionContext,
  ): TUser | TUser[keyof TUser] => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!data) return request.user as TUser;
    return request.user?.[data];
  },
);
