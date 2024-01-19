import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userService: Model<UserDocument>,
		private config: ConfigService,
		private jwt: JwtService
	){}

	async signUp(payload: any) {
		try {
			const email = await this.userService.find({ email: payload.data.email })
			console.log(email)
			if(email.length !== 0) {
				return {
					status: 500,
					message: 'Email have existed'
				}
			}
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(payload.data.password, saltRounds);
			const user = await this.userService.create({...payload.data, password: hashedPassword})
			return user;
		} catch (error) {
			throw new HttpException('email is invalid', HttpStatus.CREATED)
		}
	}

	async logIn(payload: any) {
		try {
			const email: any = await this.userService.findOne({ email: payload.data.email })
			console.log(email)
			const comparePassword= await bcrypt.compare(payload.data.password, email.password);
			console.log(comparePassword)
			if(!email) {
				throw new ForbiddenException('Credentails Incorrect!')
			}
			if(!comparePassword) {
				throw new ForbiddenException('Credentails Incorrect!')
			}
			return await this.signToken(email._id, email)
		} catch (error) {
			throw new HttpException('Credential', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async signToken(useId: number, email: string): Promise<{access_token: string}> {
		const payload = {
			sub: useId,
			email
		}

		console.log( this.config.get('JWT_SECRET'))

		const secret = this.config.get('JWT_SECRET')

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '15m',
			secret: secret
		})

		return {
			access_token: token
		}
	}
}
