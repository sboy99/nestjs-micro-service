import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  public async create(createUserDto: CreateUserDto) {
    return this.userRepo.create({
      email: createUserDto.email,
      password: await this.hashPassword(createUserDto.password),
    });
  }

  public async verify(email: string, password: string) {
    const user = await this.userRepo.findOne({ email });

    // compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
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

  private async hashPassword(password: string) {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }
}
