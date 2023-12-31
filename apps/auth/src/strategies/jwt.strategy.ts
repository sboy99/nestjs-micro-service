import { TUser } from '@app/common/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TConfig } from '../config';
import { TokenPayload } from '../types';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService<TConfig>,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => {
          const token = req.signedCookies?.['access_token'] ?? req?.accessToken;
          return token;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      const userDoc = await this.userService.findOne(userId);
      const user: TUser = {
        _id: userDoc._id.toHexString(),
        email: userDoc.email,
        password: userDoc.password,
      };
      return user;
    } catch (error) {
      throw new UnauthorizedException('You are unauthorized');
    }
  }
}
