import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GoogledriveModule } from './googledrive/googledrive.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/ecommercer_microsevices',
      {
        autoCreate: true,
      },
    ),
	ConfigModule.forRoot({isGlobal: true}),
    ProductModule,
	GoogledriveModule,
	ReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
