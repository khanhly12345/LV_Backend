import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoogleDriveService } from 'src/googledrive/googledrive.service';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { ProductOption, ProductOptionDocument } from 'src/schema/productOption.schema';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productService: Model<ProductDocument>,
		@InjectModel(ProductOption.name) private productOptionService: Model<ProductOptionDocument>,
		private readonly ggDriveService: GoogleDriveService,
	){}

	async createProduct(payload: any) {
		const product = await this.productService.create(payload.data)
		return product;
	}

	async getAllProduct() {
		const product = await this.productService.find({})
		return product;
	}

	async getProductById(payload: any) {
		const product = await this.productService.findById(payload.id)
		return product;
	}

	async editProduct(payload: any) {
		const product = await this.productService.updateOne({_id: payload.id}, payload.data)
		if(product) {
			return {
				status: true,
			}
		}
	}

	async deleteProduct(payload) {
		const product = await this.productService.findById(payload.id)

		for(let i=0; i<product.image.length; i++) {
			await this.ggDriveService.deleteImage(product.image[i])
		}

		const deleted = await this.productService.deleteOne({ _id: payload.id})
		if(deleted.deletedCount > 0) {
			return {
				status: true,
			}
		}
	}

	// option
	async createProductOptions(payload: any) {
		const productOption = await this.productOptionService.create(payload.data)
		return productOption;
	}
}
