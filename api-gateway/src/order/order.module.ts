import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'ORDER_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqps://vyvgssoj:AxwZOYn4LHstns-N-AuFtx92d5Topdrh@rattlesnake.rmq.cloudamqp.com/vyvgssoj'],
					queue: 'order_queue',
					queueOptions: {
					  durable: false
					},
				},
			}
		])
	],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
