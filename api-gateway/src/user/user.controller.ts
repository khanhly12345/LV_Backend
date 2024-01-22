import { Body, Controller, Get, Headers, Post, Req, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/Guard';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
	constructor(
		private userService: UserService,
		private config: ConfigService,
		private jwt: JwtService
		){}

	@Post('signup')
	signUp(@Body() data: any) {
		return this.userService.signUp(data)
	}

	// @UseGuards(AuthGuard('jwt'))
	// @Get('profile')
	// getUserFile(@Headers('authorization') authrization) {
	// 	const token = authrization.split(' ')[1]
	// 	const decoded = this.jwt.verify(token, { secret: this.config.get('JWT_SECRET') })
	//   console.log('decoded' + decoded.email.email)
	// }

	@UseGuards(AuthGuard('jwt'))
	@Get('profile')
	getUserFile(@Req() req) {
		console.log(req.user)
		return this.userService.getUserProfile(req.user)
	}
}
