import { UpdateCommentPipe } from '../lib/validatePipe/updateCommentPipe.class';
import { CreateCommentPipe } from '../lib/validatePipe/createCommentPipe.class';
import { CreateCommentNews, UpdateCommentNews } from './comments-news.dto';
import { CommentsNewsService } from './comments-news.service';
import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CheckUUID } from 'src/lib/validatePipe/uuidPipe.class';

@ApiTags('Comments News')
@Controller('comments-news')
export class CommentsNewsController {
  constructor(
    @Inject(CommentsNewsService)
    private readonly commentsNewsService: CommentsNewsService,
  ) {}

  @Get(':newsId')
  @ApiCreatedResponse({ description: 'Get all comments of news' })
  async GetComment(@Param('newsId', new CheckUUID()) id: string) {
    return await this.commentsNewsService.getByNews(id);
  }

  @Post('add/:newsId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Comment News' })
  async PostComment(
    @GetUser('userId') userId: string,
    @Param('newsId', new CheckUUID()) newsId: string,
    @Body(new CreateCommentPipe()) comment: CreateCommentNews,
  ) {
    return await this.commentsNewsService.postComment(userId, newsId, comment);
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Update Comment News' })
  async UpdateComment(
    @GetUser('userId') userId: string,
    @Param('id', new CheckUUID()) id: string,
    @Body(new UpdateCommentPipe()) comment: UpdateCommentNews,
  ) {
    return await this.commentsNewsService.Update(userId, id, comment);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Delete Comment News' })
  async DeleteComment(
    @GetUser('userId') userId: string,
    @Param('id', new CheckUUID()) id: string,
  ) {
    return await this.commentsNewsService.Delete(userId, id);
  }
}
