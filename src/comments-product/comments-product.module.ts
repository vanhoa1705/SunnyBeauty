import { Product } from './../entity/product.entity';
import { User } from 'src/entity/user.entity';
import { CommentsProduct } from './../entity/comments-product.entity';
import { Module } from '@nestjs/common';
import { CommentsProductController } from './comments-product.controller';
import { CommentsProductService } from './comments-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsProduct, User, Product])],
  controllers: [CommentsProductController],
  providers: [CommentsProductService],
})
export class CommentsProductModule {}
