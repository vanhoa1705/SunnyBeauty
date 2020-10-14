import { Avatar } from './../entity/avatar.entity';
import { User } from './../entity/user.entity';
import { Repository } from 'typeorm';
import {
  Injectable,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  RegisterUser,
  LoginUser,
  ChangePasswordUser,
  UpdateUser,
  DeleteUser,
} from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,

    private readonly jwtService: JwtService,
  ) {}

  // Đăng ký tài khoản
  async addUser(user: RegisterUser) {
    //Kiểm tra trùng username
    const checkUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'USERNAME_ALREADY_EXIST',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Kiểm tra trùng email
    const checkEmail = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (checkEmail) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'EMAIL_ALREADY_EXIST',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Kiểm tra trùng số điện thoại
    const checkPhone = await this.userRepository.findOne({
      where: {
        phoneNumber: user.phoneNumber,
      },
    });
    if (checkPhone) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PHONE_NUMBER_ALREADY_EXIST',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const temp = new User();
    temp.name = user.name;
    temp.username = user.username;
    temp.phoneNumber = user.phoneNumber;
    temp.password = user.password;
    temp.email = user.email;
    temp.address = user.address;

    await this.userRepository.save(temp);
    return { isSuccess: true };
  }

  //Đăng nhập
  async loginUser(user: LoginUser) {
    const checkUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    //Kiểm tra Tên đăng nhập tồn tại
    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PASSWORD_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    //Kiểm tra password
    const rs = bcrypt.compareSync(user.password, checkUser.password);
    if (rs == false) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'WRONG_PASSWORD',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      username: checkUser.username,
      userId: checkUser.id,
      role: checkUser.role,
    };

    console.log(checkUser);

    return {
      userId: checkUser.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  //Đổi mật khẩu
  async changePassword(userId: string, user: ChangePasswordUser) {
    const checkUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    //Kiểm tra Tên đăng nhập tồn tại
    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    //Kiểm tra password
    const rs = bcrypt.compareSync(user.password, checkUser.password);
    if (rs == false) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'WRONG_PASSWORD',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    checkUser.password = user.newPassword;

    await this.userRepository.save(checkUser);
    return { isSuccess: true };
  }

  //Get information
  async getSingleUser(user: string) {
    const checkUser = await this.userRepository.findOne({
      where: {
        id: user,
      },
    });
    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return { user: checkUser };
  }

  //Upload file
  async uploadAvatar(@UploadedFile('file') file, userId: string) {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'FILE_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkAvatar = await this.avatarRepository.findOne({
      where: {
        userId: userId,
      },
    });
    if (checkAvatar) {
      let temp = new Avatar();
      temp.deletedAt = new Date();
      await this.avatarRepository.update({ id: checkAvatar.id }, temp);
    }

    let avatar = new Avatar();
    avatar.userId = userId;
    avatar.name = file.filename;
    avatar.url = file.path;

    await this.avatarRepository.save(avatar);
    return { isSuccess: true };
  }

  //Download file
  // async downloadAvatar(res, fileName: string) {
  //   var fs = require('fs');
  //   try {
  //     fs.statSync('./public/images/' + fileName);
  //     await res.download('./public/images/' + fileName);
  //   } catch (err) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.NOT_FOUND,
  //         error: 'FILE_NOT_FOUND',
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  // }

  //Update user
  async update(userId: string, user: UpdateUser) {
    const checkUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (user.name) {
      checkUser.name = user.name;
    }
    if (user.email) {
      checkUser.email = user.email;
    }

    if (user.phoneNumber) {
      checkUser.phoneNumber = user.phoneNumber;
    }

    if (user.address) {
      checkUser.address = user.address;
    }

    delete checkUser.password;

    await this.userRepository.save(checkUser);
    return { isSuccess: true };
  }

  //delete
  async delete(userId: string) {
    const check = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!check) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.softRemove(check);
    return { isSuccess: true };
  }
}
