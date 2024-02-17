import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
	constructor(@Inject('ORDER_SERVICE') private client: ClientProxy){}

	createOrder(payload: any) {
		return this.client.send('create_order', { payload })
	}

	getOrder() {
		return this.client.send('get_order', { })
	}

	deleteOrder(id: string) {
		return this.client.send('delete_order', { id })
	}

	getInvoice(id: string) {
		return this.client.send('get_invoice', { id })
	}

	getInvoiceById(id: string) {
		console.log(id)
		return this.client.send('getInvoiceById', { id })
	}
}
