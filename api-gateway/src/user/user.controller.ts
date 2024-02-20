import { Body, Controller, Get, Headers, Param, Post, Req, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/Guard';
import { JwtService } from '@nestjs/jwt';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from 'src/googledrive/googledrive.service';

@Controller('users')
export class UserController {
	constructor(
		private userService: UserService,
		private config: ConfigService,
		private jwt: JwtService,
		private readonly ggDriveService: GoogleDriveService,
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

	@Post('adduser/:id')
	@UseInterceptors(FilesInterceptor('avatar'))
	async addUser(@Body() data: any, @UploadedFiles() files: any, @Param('id') id: string) {
		const fileId = await this.ggDriveService.uploadImage(files[0].buffer, files[0].originalname)
		return this.userService.addUser({ ...data, urlId: fileId}, id)
	}

	@Get('getAllUser')
	getAllUser() {
		return this.userService.getAllUser()
	}
}
