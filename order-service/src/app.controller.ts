import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('order')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sendEmail: MailerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sendMail')
  async sendMail() {
	await this.sendEmail.sendMail({
		to: 'lyb2000150@student.ctu.edu.vn',
		from: 'nguyenkhanhlyphosinh@gmail.com',
		subject: 'co don hang moi hahaha',
		text: 'hi'
	})
	return 'success';
  }
}
