import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
	MongooseModule.forRoot('mongodb://localhost:27017/ecommercer_microsevices', {
		autoCreate: true
	}),
	OrderModule,
	EmailModule,
	MailerModule.forRoot({
		transport: {
			host: 'smtp.sendgrid.net',
			auth: {
				user: 'apikey',
				pass: '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'
			}
		}
	})
	],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
