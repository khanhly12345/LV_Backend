import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderController } from './order.controller';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
		{ name: Order.name, schema: OrderSchema },
		{ name: User.name, schema: UserSchema },
	]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
