import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}

	@MessagePattern('signup')
	signUp(@Body() data: any) {
		return this.authService.signUp(data)
	}

	@MessagePattern('login')
	logIn(@Body() data: any) {
		return this.authService.logIn(data)
	}
}
