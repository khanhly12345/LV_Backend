import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: mongoose.Model<User>,
  ) {}

//   async findAll(): Promise<User[]> {
//     const users = await this.usersModel.find().exec();
//     return users;
//   }

//   async createUser(data: User) {
// 	const user = await this.usersModel.create(data)
// 	return user;
//   }
}
