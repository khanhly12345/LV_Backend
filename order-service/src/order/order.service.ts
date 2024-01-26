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
}
