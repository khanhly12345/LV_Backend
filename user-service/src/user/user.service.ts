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

	return {
		email: user.email,
		urlId: user.urlId
	}
  }
}
