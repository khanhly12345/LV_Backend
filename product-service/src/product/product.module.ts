import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { ProductOption, ProductOptionSchema } from 'src/schema/productOption.schema';
import { GoogleDriveService } from 'src/googledrive/googledrive.service';
import { Favorites, FavoritesSchema } from 'src/schema/favorites';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
			{ name: ProductOption.name, schema: ProductOptionSchema },
			{ name: Favorites.name, schema: FavoritesSchema },
		]),
	  ],
  controllers: [ProductController],
  providers: [ProductService, GoogleDriveService]
})
export class ProductModule {}
