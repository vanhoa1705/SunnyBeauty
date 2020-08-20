import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsProductModule } from './comments-product/comments-product.module';
import { BrandsModule } from './brands/brands.module';
import { OrdersModule } from './orders/orders.module';
import { AddressesShipModule } from './addresses-ship/addresses-ship.module';
import { NewsModule } from './news/news.module';
import { CommentsNewsModule } from './comments-news/comments-news.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CommentsProductModule,
    BrandsModule,
    OrdersModule,
    AddressesShipModule,
    NewsModule,
    CommentsNewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
