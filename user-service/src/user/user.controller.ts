import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('users')
export class UserController {
	constructor(private userService: UserService){}

	@Get()
	async getAllUser(): Promise<User[]> {
		return this.userService.findAll()
	}

	@Post()
	async createUser(@Body() user) {
		return this.userService.createUser(user)
	}

}
