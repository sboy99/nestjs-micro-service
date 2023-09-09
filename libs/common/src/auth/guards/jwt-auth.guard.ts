import { AUTH_SERVICE } from '@app/common/constants';
import { MessagePatterns } from '@app/common/enums';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable, map, tap } from 'rxjs';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    // reject if no access token
    const accessToken = req.signedCookies?.['access_token'];
    if (!accessToken) return false;

    // send auth microservice authenticate request
    return this.authClient.send(MessagePatterns.Authenticate, accessToken).pipe(
      tap((res) => (req.user = res)),
      map(() => true),
    );
  }
}
