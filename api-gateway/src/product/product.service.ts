import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class ProductService {
	constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy){}

	createProduct(data: any) {
		return this.client.send('create_product', {data})
	}

	getAllProduct() {
		return this.client.send('getAll_product', {})
	}

	getProductById(id) {
		return this.client.send('get_productById', {id})
	}

	editProduct(id, data) {
		return this.client.send('edit_product', {id, data})
	}

	deleteProduct(id: string) {
		return this.client.send('delete_product', {id})
	}
	// option

	createProductOptions(data: any) {
		return this.client.send('create_productOptions', {data})
	}

	getProductOptionsById(id: any) {
		return this.client.send('getById_productOptions', {id})
	}
	// cart

	getCart(cart: any) {
		return this.client.send('getCart', { cart })
	}
}
