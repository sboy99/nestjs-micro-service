import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { LocalStrategy } from '../strategies';
import { UserModelDef } from './models/user.schema';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([UserModelDef])],
  controllers: [UserController],
  providers: [UserService, UserRepo, LocalStrategy],
  exports: [UserService],
})
export class UserModule {}
