import { CreateCommentNews, UpdateCommentNews } from './comments-news.dto';
import { News } from './../entity/news.entity';
import { CommentsNews } from './../entity/comments-news.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class CommentsNewsService {
  constructor(
    @InjectRepository(CommentsNews)
    private readonly commentsNewsRepository: Repository<CommentsNews>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async getByNews(id: string) {
    const comment = await this.commentsNewsRepository.find({
      where: { newsId: id },
    });
    return { comment: comment };
  }

  async postComment(
    userId: string,
    newsId: string,
    comment: CreateCommentNews,
  ) {
    if (!comment.parentId) {
      //Kiểm tra tồn tại parentID
      const checkParentId = await this.commentsNewsRepository.findOne({
        where: {
          commentId: comment.parentId,
        },
      });
      if (!checkParentId) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'PARENTID_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }

    //kiểm tra tồn tại news id
    const checkNewsId = await this.newsRepository.findOne({
      where: { id: newsId },
    });

    if (!checkNewsId) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'NEWS_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const cmt = new CommentsNews();
    cmt.parentId = comment.parentId;
    cmt.newsId = newsId;
    cmt.content = comment.content;
    cmt.userId = userId;

    await this.commentsNewsRepository.save(cmt);
    return { isSuccess: true };
  }

  async Update(userId: string, id: string, comment: UpdateCommentNews) {
    //kiểm tra comment
    const checkComment = await this.commentsNewsRepository.findOne({
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
    await this.commentsNewsRepository.save(checkComment);
    return { isSuccess: true };
  }

  async Delete(userId: string, id: string) {
    const checkComment = await this.commentsNewsRepository.findOne({
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
    await this.commentsNewsRepository.save(checkComment);
    return { isSuccess: true };
  }
}
