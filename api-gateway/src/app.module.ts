import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { GoogledriveModule } from './googledrive/googledrive.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './Guard/jwt-guard.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), ProductModule, GoogledriveModule, UserModule, AuthModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
