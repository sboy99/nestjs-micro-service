import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [LoggerModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
