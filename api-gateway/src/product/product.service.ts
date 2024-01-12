import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class ProductService {
	constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy){}

	createProduct(data: any) {
		return this.client.send('create_product', {data})
	}

	createProductOptions(data: any) {
		return this.client.send('create_productOptions', {data})
	}
}
