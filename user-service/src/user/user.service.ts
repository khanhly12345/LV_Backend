import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from './schema/user.schema';


@Injectable()
export class UserService {
  constructor(
	@InjectModel(User.name) private userService: mongoose.Model<UserDocument>,
  ) {}

   async getUserProfile(payload: any) {

	const user: any = await this.userService.findOne({ _id: payload.data })
	delete user._doc.password
	console.log({...user})
	return { ...user._doc };
  }

  async addUser(payload: any) {
	const user: any = await this.userService.updateOne({ _id: payload.id} , payload.data)
	return user;
  }

  async getAllUser() {
	const user = await this.userService.find({})
	return user;
  }
}
