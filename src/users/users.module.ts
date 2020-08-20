import { Avatar } from './../entity/avatar.entity';
import { User } from './../entity/user.entity';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Avatar]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
