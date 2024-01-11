import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { GoogledriveModule } from './googledrive/googledrive.module';

@Module({
  imports: [ProductModule, GoogledriveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
