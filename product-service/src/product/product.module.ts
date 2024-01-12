import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { ProductOption, ProductOptionSchema } from 'src/schema/productOption.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
			{ name: ProductOption.name, schema: ProductOptionSchema },
		]),
	  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
