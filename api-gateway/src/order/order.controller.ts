import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService){}

	@Post('create')
	createOrder(@Body() data) {
		return this.orderService.createOrder(data)
	}
}
