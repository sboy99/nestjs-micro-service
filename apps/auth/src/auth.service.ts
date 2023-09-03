import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TConfig } from './config';
import { UserDocument } from './user/models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<TConfig>,
  ) {}

  public async getLoginToken(user: UserDocument): Promise<string> {
    // prepare token payload
    const tokenPayload = {
      userId: user._id.toHexString(),
    };

    // create jwt token
    const token = await this.jwtService.signAsync(tokenPayload);
    return token;
  }

  public attachAuthCookie(res: Response, token: string) {
    // token expiration date
    const cookieExpiration = this.configService.get('JWT_EXPIRATION') as number;
    const expirationDate = new Date();
    expirationDate.setSeconds(cookieExpiration);

    res.cookie('access_token', token, {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expirationDate,
    });
  }
}
