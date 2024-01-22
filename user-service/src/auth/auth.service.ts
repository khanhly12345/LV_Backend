import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
		private jwt: JwtService,
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

			if(!email) {
				return  new HttpException('Email Not Found!', HttpStatus.UNAUTHORIZED);
			}

			const comparePassword= await bcrypt.compare(payload.data.password, email.password);

			if(!comparePassword) {
				return new HttpException('Incorrect Password!', HttpStatus.UNAUTHORIZED)
			}

			return await this.signToken(email._id, email)
		} catch (error) {
			throw new HttpException('Credential', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async signToken(useId: number, email: string): Promise<{access_token: string, refresh_token: string}> {
		const payload = {
			sub: useId,
			email
		}

		const secret = this.config.get('JWT_SECRET')

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '3d',
			secret: secret
		})

		const refreshToken = await this.jwt.signAsync(payload, {
			expiresIn: '7d',
			secret: secret
		})

		return {
			access_token: token,
			refresh_token: refreshToken
		}
	}

	async signAccessToken(useId: number, email: string): Promise<{access_token: string}> {
		const payload = {
			sub: useId,
			email
		}

		const secret = this.config.get('JWT_SECRET')

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '3d',
			secret: secret
		})

		return {
			access_token: token,
		}
	}

	async refreshToken(payload: any) {
		try {
			// console.log(payload)
			const decoded = await this.jwt.verify(payload.data.refresh_token, { secret: this.config.get('JWT_SECRET') })

			const email: any = await this.userService.findOne({ _id: decoded.email._id })
			return this.signAccessToken(email._id, email)
		} catch (error) {
			throw new HttpException('Credential', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
