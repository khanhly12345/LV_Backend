import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Rate, RateSchema } from 'src/schema/rate.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { Product, ProductSchema } from 'src/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
		{ name: Rate.name, schema: RateSchema },
		{ name: User.name, schema: UserSchema },
		{ name: Product.name, schema: ProductSchema },
	]),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
