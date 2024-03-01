import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoogleDriveService } from 'src/googledrive/googledrive.service';
import { Favorites, FavoritesDocument } from 'src/schema/favorites';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { ProductOption, ProductOptionDocument } from 'src/schema/productOption.schema';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productService: Model<ProductDocument>,
		@InjectModel(ProductOption.name) private productOptionService: Model<ProductOptionDocument>,
		@InjectModel(Favorites.name) private favoritesService: Model<FavoritesDocument>,
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

	async deleteProduct(payload: any) {
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

	async getProductOptionsById(payload: any) {
		const productOption = await this.productOptionService.find({ productId: payload.id})
		return productOption;
	}

	// cart
	async getCart(payload: any) {
		const cart = await this.productOptionService.find({ _id: { $in: payload.cart }}).populate('productId')
		return cart;
	}

	// search
	async search(payload: any) {
		 const product = await this.productService.find({ productName: { $regex: new RegExp(payload.data.value, 'i')}})
		 return product;
	}

	async myFavoriteItem(payload: any) {
		console.log(payload)
		try {
			const favoriteItems = await this.favoritesService.find({ userId: payload.data.userId, productId: payload.data.productId })
			if(favoriteItems.length === 0) {
				await this.favoritesService.create(payload.data)
			} else {
				await this.favoritesService.updateOne({ favorite: payload.data.favorite})
			}
		} catch (error) {
			throw new HttpException('Credential', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getMyFavoriteItem(payload: any) {
		try {
			const favoriteItems = await this.favoritesService.findOne({ userId: payload.data.userId, productId: payload.data.productId })
			console.log(favoriteItems)
			if(favoriteItems) {
				return {
					favorite: favoriteItems.favorite
				}
			} else {
				return {
					favorite: false
				}
			}
		} catch (error) {
			throw new HttpException('Credential', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
