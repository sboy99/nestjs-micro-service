import { AbstractRepo } from '@app/common';
import { UserDocument } from '@app/common/models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepo extends AbstractRepo<UserDocument> {
  protected readonly logger = new Logger(UserRepo.name);

  constructor(
    @InjectModel(UserDocument.name) readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
