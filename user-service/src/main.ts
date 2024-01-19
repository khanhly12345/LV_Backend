import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
	transport: Transport.RMQ,
	options: {
		urls: ['amqps://vyvgssoj:AxwZOYn4LHstns-N-AuFtx92d5Topdrh@rattlesnake.rmq.cloudamqp.com/vyvgssoj'],
		queue: "user_queue",
		queueOptions: {
			durable: false
		}
	}
  })
  app.startAllMicroservices()
  await app.listen(3003);
}
bootstrap();
