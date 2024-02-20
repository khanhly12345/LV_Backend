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

  @MessagePattern('get_order')
  getOrder() {
	return this.orderService.getOrder()
  }

  @MessagePattern('delete_order')
  deleteOrder(@Body() id: string){
	return this.orderService.deleteOrder(id)
  }

  @MessagePattern('get_invoice')
  getInvoice(@Body() id: string) {
	return this.orderService.getInvoice(id)
  }

  @MessagePattern('getInvoiceById')
  getInvoiceById(@Body() id: string) {
	return this.orderService.getInvoiceById(id)
  }

  @MessagePattern('getChartUser')
  chartUser() {
	return this.orderService.chartUser()
  }

  @MessagePattern('getChartOrder')
  chartTotalAmoutOfOrder() {
	return this.orderService.chartTotalAmoutOfOrder()
  }
}
