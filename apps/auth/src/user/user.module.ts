import { DatabaseModule } from '@app/common';
import { UserModelDef } from '@app/common/models';
import { Module } from '@nestjs/common';
import { LocalStrategy } from '../strategies';
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
