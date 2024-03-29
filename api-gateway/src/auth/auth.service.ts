import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
	constructor(@Inject('USER_SERVICE') private client: ClientProxy){}

	async signUp(data: any) {
		return this.client.send('signup', { data })
	}

	async logIn(data: any) {
		return this.client.send('login', { data })
	}
	async refreshToken(data: any) {
		return this.client.send('refresh_token', { data })
	}

	async loginAdmin(data) {
		return this.client.send('loginAdmin', { data })
	}

	async changePassword(data) {
		return this.client.send('changePassword', { data })
	}
}
