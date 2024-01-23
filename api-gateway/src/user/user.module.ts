import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/Guard/jwt-guard.service';
import { GoogleDriveService } from 'src/googledrive/googledrive.service';

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
		]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({

		})
	],
  providers: [UserService, JwtStrategy, GoogleDriveService],
  controllers: [UserController]
})
export class UserModule {}
