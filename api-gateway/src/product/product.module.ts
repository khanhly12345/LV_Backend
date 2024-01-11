import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GoogleDriveService } from 'src/googledrive/googledrive.service';
@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'PRODUCT_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqps://vyvgssoj:AxwZOYn4LHstns-N-AuFtx92d5Topdrh@rattlesnake.rmq.cloudamqp.com/vyvgssoj'],
					queue: 'product_queue',
					queueOptions: {
					  durable: false
					},
				},
			}
		])
	],
  providers: [ProductService, GoogleDriveService],
  controllers: [ProductController]
})
export class ProductModule {}
