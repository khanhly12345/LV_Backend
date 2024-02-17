import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
	constructor(@InjectModel(Order.name) private readonly orderService: Model<OrderDocument>){}

	async create(data: Order) {
		const order = await this.orderService.create(data)
		return order;
	}

	async populateOrder() {
		return this.orderService.find().populate('user').exec()
	}

	async createOrder(data: any) {
		console.log(data)
		const order = await this.orderService.create(data.payload)
		return order;
	}

	async getOrder() {
		// const order = await this.orderService.find().populate('userId').populate({
		// 	path: 'items.item',
		// 	populate: {
		// 		path: 'productId',
		// 		model: 'Product'
		// 	}
		// })
		const order = await this.orderService.find().populate('userId');
		return order;
	}

	async deleteOrder(data: any) {
		console.log(data)
		const order = await this.orderService.deleteOne( { _id: data.id })
		return order;
	}

	async getInvoice(data: any) {
		console.log(data)
		const invoice = await this.orderService.findOne({ _id: data.id }).populate('userId').populate({
				path: 'items.item',
				populate: {
					path: 'productId',
					model: 'Product'
				}
			})
		console.log(invoice)
		return invoice;
	}

	async getInvoiceById(data: any) {
		const invoice = await this.orderService.find({ userId: data.id.id}).populate({
			path: 'items.item',
			populate: {
				path: 'productId',
				model: 'Product'
			}
		})
		return invoice;
	}
}
