import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() data: Order) {
    return this.orderService.create(data);
  }

  @Get()
  async getOrder() {
	return this.orderService.populateOrder()
  }
}
