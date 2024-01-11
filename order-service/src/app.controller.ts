import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Order } from './order/schema/order.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
