import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators';
import { LocalAuthGuard } from './guards';
import { UserDocument } from './user/models/user.schema';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    // get login token
    const token = await this.authService.getLoginToken(user);
    // attach auth cookie
    this.authService.attachAuthCookie(res, token);

    return {
      accessToken: token,
    };
  }
}
