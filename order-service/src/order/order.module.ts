import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderController } from './order.controller';
import { User, UserSchema } from './schema/user.schema';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductOption, ProductOptionSchema } from './schema/productOption.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
		{ name: Order.name, schema: OrderSchema },
		{ name: User.name, schema: UserSchema },
		{ name: Product.name, schema: ProductSchema },
		{ name: ProductOption.name, schema: ProductOptionSchema },
	]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
