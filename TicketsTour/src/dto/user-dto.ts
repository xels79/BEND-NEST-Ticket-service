import { IUserUpdate } from 'src/interfaces/IUserUpdate';
import { IUser } from 'src/interfaces/user';
import { hashSync, genSaltSync } from 'bcrypt';
export class SendingUserDTO {
  cardNumber: string;
  username: string;
  realname: string;
  email: string;
  constructor(data: IUser) {
    if (data) {
      this.cardNumber = data.cardNumber ? data.cardNumber : '';
      this.username = data.username?.trim();
      this.email = data.email;
      this.realname = data.realname?.trim();
    }
  }
}
export class LSUserDto extends SendingUserDTO implements IUser {
  _id: string | undefined;
  constructor(data: IUser) {
    super(data);
    if (data) {
      if (data._id) {
        this._id = data._id;
      }
    }
  }
}

export class UserDto extends LSUserDto {
  pswd: string;
  constructor(data: IUser) {
    super(data);
    if (data) {
      this.pswd = data.pswd;
    }
  }
}
export class UserUpdateDto extends UserDto implements IUserUpdate {
  oldPassword: string;
  newPassword: string;
  userId: string;

  constructor(data: IUserUpdate) {
    super(data);
    if (data) {
      this.oldPassword = data?.oldPassword;
      this.newPassword = data?.newPassword;
      this.userId = data?.userId;
    }
  }
  getUserDto(): UserDto {
    const nUser = new UserDto(new LSUserDto(this));
    if (this.newPassword && this.oldPassword) {
      nUser.pswd = hashSync(this.newPassword, genSaltSync());
    } else {
      nUser.pswd = this.pswd;
    }
    return nUser;
  }
}
