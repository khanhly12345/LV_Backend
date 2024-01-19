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
}
