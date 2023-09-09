import { CurrentUser } from '@app/common/decorators';
import { MessagePatterns } from '@app/common/enums';
import { TUser } from '@app/common/types';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { UserDocument } from './user/models/user.schema';

@Controller('auth')
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

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@CurrentUser() user: TUser) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(MessagePatterns.Authenticate)
  async authenticateUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
