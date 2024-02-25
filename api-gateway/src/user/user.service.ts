import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
	constructor(@Inject('USER_SERVICE') private client: ClientProxy){}
	async signUp(data: any) {
		return this.client.send('signup', { data })
	}

	async getUserProfile(data: string) {
		return this.client.send('get_profile', { data })
	}

	addUser(data: any, id: string) {
		return this.client.send('add_profile', { data, id })
	}

	getAllUser() {
		return this.client.send('getAllUser', {})
	}

	deleteUser(id: any) {
		return this.client.send('deleteUser', { id })
	}

	editUser(data: any) {
		return this.client.send('editUser', { data })
	}
}
