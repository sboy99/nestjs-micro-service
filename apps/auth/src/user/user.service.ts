import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  findAll() {
    return this.userRepo.list();
  }

  findOne(_id: string) {
    return this.userRepo.findOne({ _id });
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.findOneAndUpdate({ _id }, { $set: updateUserDto });
  }

  remove(_id: string) {
    return this.userRepo.findOneAndDelete({ _id });
  }
}
