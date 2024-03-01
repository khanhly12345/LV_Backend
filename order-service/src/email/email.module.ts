import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
	imports: [
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
  providers: [EmailService]
})
export class EmailModule {}
