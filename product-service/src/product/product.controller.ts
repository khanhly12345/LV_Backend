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

	@MessagePattern('create_productOptions')
	createProductOptions(@Payload() data: any) {
		return this.productService.createProductOptions(data)
	}
}
