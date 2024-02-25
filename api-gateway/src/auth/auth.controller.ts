import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}

	@Post('signup')
	signUp(@Body() data: any) {
		return this.authService.signUp(data)
	}

	@Post('login')
	logIn(@Body() data: any) {
		return this.authService.logIn(data)
	}

	@Post('refresh_token')
	refreshToken(@Body() refresh_token: string) {
		return this.authService.refreshToken(refresh_token)
	}

	@Post('admin/login')
	loginAdmin(@Body() data: any) {
		console.log(data)
		return this.authService.loginAdmin(data)
	}

	@Post('changePassword')
	changePassword(@Body() data: any) {
		console.log(data)
		return this.authService.changePassword(data)
	}
}
