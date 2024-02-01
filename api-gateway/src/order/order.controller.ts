import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService){}

	@Post('create')
	createOrder(@Body() data) {
		return this.orderService.createOrder(data)
	}

	@Get('getorder')
	getOrder() {
		return this.orderService.getOrder()
	}

	@Post('delete')
	deleteOrder(@Body() data: any) {
		console.log(data)
		return this.orderService.deleteOrder(data.id)
	}

	@Post('invoice')
	getInvoice(@Body() data: any) {
		console.log(data)
		return this.orderService.getInvoice(data.id)
	}
}
