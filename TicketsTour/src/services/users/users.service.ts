import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LSUserDto, UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/schemas/user';
import { compare } from 'bcrypt';
import { ILSUser, IUser } from 'src/interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
  private static user: LSUserDto = null;
  private static userSubject = new BehaviorSubject<LSUserDto | null>(null);
  readonly $userSubject = UsersService.userSubject.asObservable();

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    UsersService.userSubject.subscribe((user) => {
      UsersService.user = user;
    });
    console.log('UserService start up.');
  }
  setUser(user: IUser): void {
    UsersService.userSubject.next(new LSUserDto(user));
  }
  getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }
  getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  async getUserByUsername(username: string): Promise<UserDto> {
    const user: IUser = await this.userModel.findOne({ username: username });
    if (user) {
      return new UserDto(user);
    } else {
      return null;
    }
    // return this.userModel.findOne({ username:username });
  }
  async addUser(data: UserDto): Promise<User> {
    const userData = new this.userModel(data);
    console.log(data);
    return userData.save();
  }
  deleteAllUser(): Promise<{ deletedCount: number }> {
    return this.userModel.deleteMany();
  }
  deleteById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  updateById(id: string, data: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data);
  }
  async login(userData: IUser): Promise<ILSUser> {
    console.log(UsersService.user);
    const payload = {
      username: userData.username,
      sub: userData.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: new LSUserDto(userData),
    };
  }
  async checkAuthUser(username: string, psw: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      return null;
    }
    if (!(await compare(psw, user.pswd))) {
      return null;
    }
    return user;
  }

  async checkRegUser(username: string, email: string): Promise<User[]> {
    console.log('checkRegUser:', username, email);
    return await this.userModel
      .find()
      .or([{ username: username }, { email: email }]);
  }
}
