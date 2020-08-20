import { News } from './../entity/news.entity';
import { CommentsNews } from './../entity/comments-news.entity';
import { Module } from '@nestjs/common';
import { CommentsNewsController } from './comments-news.controller';
import { CommentsNewsService } from './comments-news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsNews, User, News])],
  controllers: [CommentsNewsController],
  providers: [CommentsNewsService],
})
export class CommentsNewsModule {}
