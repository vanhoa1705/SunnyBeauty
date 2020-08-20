import { ApiProperty } from '@nestjs/swagger';

export class LoginUser {
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @ApiProperty({ type: String, description: 'password' })
  password: string;
}

export class RegisterUser {
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @ApiProperty({ type: String, description: 'Name' })
  name: string;

  @ApiProperty({ type: String, description: 'Phone Number' })
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @ApiProperty({ type: String, description: 'Address' })
  address: string;
}

export class ChangePasswordUser {
  @ApiProperty({ type: String, description: 'Password' })
  password: string;

  @ApiProperty({ type: String, description: 'New password' })
  newPassword: string;

  @ApiProperty({ type: String, description: 'Re-password' })
  rePassword: string;
}

export class UpdateUser {
  @ApiProperty({ type: String, description: 'Name' })
  name: string;

  @ApiProperty({ type: String, description: 'Phone Number' })
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @ApiProperty({ type: String, description: 'Address' })
  address: string;
}

export class DeleteUser {
  @ApiProperty({ type: String, description: 'Id' })
  id: string;
}

export class UploadUser {
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;
}
