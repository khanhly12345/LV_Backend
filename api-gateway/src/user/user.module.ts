import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'USER_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqps://vyvgssoj:AxwZOYn4LHstns-N-AuFtx92d5Topdrh@rattlesnake.rmq.cloudamqp.com/vyvgssoj'],
					queue: 'user_queue',
					queueOptions: {
					  durable: false
					},
				},
			}
		])
	],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
