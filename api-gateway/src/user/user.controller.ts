import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private userService: UserService){}

	@Post('signup')
	signUp(@Body() data: any) {
		return this.userService.signUp(data)
	}
}
