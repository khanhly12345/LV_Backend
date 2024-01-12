import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { ProductOption, ProductOptionDocument } from 'src/schema/productOption.schema';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productService: Model<ProductDocument>,
		@InjectModel(ProductOption.name) private productOptionService: Model<ProductOptionDocument>
	){}

	async createProduct(payload: any) {
		const product = await this.productService.create(payload.data)
		return product;
	}

	async createProductOptions(payload: any) {
		const productOption = await this.productOptionService.create(payload.data)
		return productOption;
	}
}
