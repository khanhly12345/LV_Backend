import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GoogledriveModule } from './googledrive/googledrive.module';

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
	GoogledriveModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
