import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService){}

	@MessagePattern('create_product')
	createProduct(@Payload() data: any) {
		return this.productService.createProduct(data)
	}

	@MessagePattern('getAll_product')
	getALLProduct() {
		return this.productService.getAllProduct()
	}

	@MessagePattern('get_productById')
	getProductById(@Payload() id: any) {
		return this.productService.getProductById(id)
	}

	@MessagePattern('edit_product')
	editProduct(@Payload() payload: any) {
		return this.productService.editProduct(payload)
	}

	@MessagePattern('delete_product')
	deleteProduct(@Payload() payload: any) {
		return this.productService.deleteProduct(payload)
	}
	// option
	@MessagePattern('create_productOptions')
	createProductOptions(@Payload() data: any) {
		return this.productService.createProductOptions(data)
	}

	@MessagePattern('getById_productOptions')
	getProductOptionsById(@Payload() data: any) {
		console.log(data)
		return this.productService.getProductOptionsById(data)
	}

	// cart
	@MessagePattern('getCart')
	getCart(@Payload() data: any) {
		return this.productService.getCart(data)
	}
}
