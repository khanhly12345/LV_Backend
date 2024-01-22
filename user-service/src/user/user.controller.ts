import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UserController {
	constructor(private userService: UserService){}

	@MessagePattern('get_profile')
	getUserProfile(@Body() data: any) {
		return this.userService.getUserProfile(data);
	}
}
