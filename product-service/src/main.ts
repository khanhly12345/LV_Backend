import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
	transport: Transport.RMQ,
	options: {
		urls: ['amqps://vyvgssoj:AxwZOYn4LHstns-N-AuFtx92d5Topdrh@rattlesnake.rmq.cloudamqp.com/vyvgssoj'],
		queue: "products_queue",
		queueOptions: {
			durable: false
		}
	}
  })
  app.enableCors();

  app.use('/uploads', express.static('uploads'));
  await app.startAllMicroservices()
  await app.listen(3001);
}
bootstrap();
