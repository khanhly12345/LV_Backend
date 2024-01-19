import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}

	@Post('signup')
	signUp(@Body() data: any) {
		console.log(data)
		return this.authService.signUp(data)
	}

	@Post('login')
	logIn(@Body() data: any) {
		console.log(data)
		return this.authService.logIn(data)
	}
}
