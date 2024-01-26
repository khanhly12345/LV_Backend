import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';
import { MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @MessagePattern('create_order')
  createOrder(@Body()data :any) {
	return this.orderService.createOrder(data)
  }
}
