import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
	constructor(@Inject('USER_SERVICE') private client: ClientProxy){}
	async signUp(data: any) {
		return this.client.send('signup', { data })
	}
}
