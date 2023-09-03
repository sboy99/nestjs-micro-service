import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from '../user/models/user.schema';

export const CurrentUser = createParamDecorator(
  (
    data: keyof UserDocument | undefined,
    ctx: ExecutionContext,
  ): UserDocument | UserDocument[keyof UserDocument] => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!data) return request.user as UserDocument;
    return request.user[data];
  },
);
