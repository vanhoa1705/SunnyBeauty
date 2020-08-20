import { Product } from './../entity/product.entity';
import { User } from 'src/entity/user.entity';
import { CommentsProduct } from './../entity/comments-product.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCommentProduct,
  UpdateCommentProduct,
} from './comments-product.dto';

@Injectable()
export class CommentsProductService {
  constructor(
    @InjectRepository(CommentsProduct)
    private readonly commentsProductRepository: Repository<CommentsProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getByProduct(id: string) {
    const comment = await this.commentsProductRepository.find({
      where: { productId: id },
    });
    return { comment: comment };
  }

  async postComment(
    userId: string,
    productId: string,
    comment: CreateCommentProduct,
  ) {
    //Kiểm tra ParentId
    if (comment.parentId) {
      //Kiểm tra tồn tại parentId
      const checkComment = await this.commentsProductRepository.findOne({
        where: {
          commentId: comment.parentId,
        },
      });
      if (!checkComment) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PARENTID_NOT_EXIST',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    //Kiểm tra tồn tại productId
    const checkProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!checkProduct) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'PRODUCT_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const cmt = new CommentsProduct();
    cmt.parentId = comment.parentId;
    cmt.productId = productId;
    cmt.content = comment.content;
    cmt.userId = userId;

    await this.commentsProductRepository.save(cmt);
    return { isSuccess: true };
  }

  async Update(userId: string, id: string, comment: UpdateCommentProduct) {
    //Kiểm tra tồn tại của comment
    const checkComment = await this.commentsProductRepository.findOne({
      where: { commentId: id, userId: userId },
    });

    if (!checkComment) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'COMMENT_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (comment.content) {
      checkComment.content = comment.content;
    }
    await this.commentsProductRepository.save(checkComment);
    return { isSuccess: true };
  }

  async Delete(userId: string, id: string) {
    const checkComment = await this.commentsProductRepository.findOne({
      where: { commentId: id, userId: userId },
    });

    if (!checkComment) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'COMMENT_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    checkComment.deletedAt = new Date();
    await this.commentsProductRepository.save(checkComment);
    return { isSuccess: true };
  }
}
