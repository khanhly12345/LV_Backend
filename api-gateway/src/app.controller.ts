import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService, ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
