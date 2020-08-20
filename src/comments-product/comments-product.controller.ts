import { UpdateCommentPipe } from './../lib/validatePipe/updateCommentPipe.class';
import { CreateCommentPipe } from './../lib/validatePipe/createCommentPipe.class';
import {
  CreateCommentProduct,
  UpdateCommentProduct,
} from './comments-product.dto';
import { CommentsProductService } from './comments-product.service';
import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CheckUUID } from 'src/lib/validatePipe/uuidPipe.class';

@ApiTags('Comments Product')
@Controller('comments-product')
export class CommentsProductController {
  constructor(
    @Inject(CommentsProductService)
    private readonly commentsProductService: CommentsProductService,
  ) {}

  @Get(':productId')
  @ApiCreatedResponse({ description: 'Get all comments of product' })
  async GetComment(@Param('productId', new CheckUUID()) id: string) {
    return await this.commentsProductService.getByProduct(id);
  }

  @Post('add/:productId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Comment Product' })
  async PostComment(
    @GetUser('userId') userId: string,
    @Param('productId', new CheckUUID()) productId: string,
    @Body(new CreateCommentPipe()) comment: CreateCommentProduct,
  ) {
    return await this.commentsProductService.postComment(
      userId,
      productId,
      comment,
    );
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Update Comment Product' })
  async UpdateComment(
    @GetUser('userId') userId: string,
    @Param('id', new CheckUUID()) id: string,
    @Body(new UpdateCommentPipe()) comment: UpdateCommentProduct,
  ) {
    return await this.commentsProductService.Update(userId, id, comment);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Delete Comment Product' })
  async DeleteComment(
    @GetUser('userId') userId: string,
    @Param('id', new CheckUUID()) id: string,
  ) {
    return await this.commentsProductService.Delete(userId, id);
  }
}
