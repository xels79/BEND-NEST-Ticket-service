import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationError,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto, UserUpdateDto } from 'src/dto/user-dto';
import { IErrorMessage } from 'src/interfaces/IErrorMessage';
import { IUserUpdate } from 'src/interfaces/IUserUpdate';
import { ILSUser, IUser } from 'src/interfaces/user';
import { User } from 'src/schemas/user';
import { JwtAuthGuard } from 'src/services/Authentication/jwt-auth.guard/jwt-auth.guard';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  //
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserId(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post(':username')
  authUser(@Body() data: IUser): Promise<ILSUser> {
    return this.usersService.login(data);
  }

  // @UseGuards(JwtAuthGuard)
  // @Put(":username")
  // async updateUser(@Body() data: IPasswordChange, @Param('username') username:string): Promise<ILSUser> {
  //     const user = ( await this.usersService.checkAuthUser( username, data.oldPassword ));
  //     if (user){

  //     }else{
  //         throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
  //     }
  // }

  @Post()
  sendUser(@Body() _data: IUser): Promise<ILSUser | IErrorMessage[]> {
    const data = new UserDto(_data);
    console.log(data);
    return this.usersService
      .checkRegUser(data.username, data.email)
      .then(async (queryRes) => {
        console.log('data reg:', queryRes);
        if (!queryRes.length) {
          try {
            return this.usersService.login(data);
          } catch (err) {
            const error: ValidationError = err;
            console.log(error);
            console.log(err.message);
            throw new HttpException(
              [{ fieldName: '', message: err.message }],
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        } else {
          const rVal: IErrorMessage[] = [];
          if (queryRes[0].username === data.username) {
            rVal.push({
              fieldName: 'username',
              message: 'Пользователь с таким именем уже существует!',
            });
          }
          if (queryRes[0].email == data.email) {
            rVal.push({
              fieldName: 'email',
              message: `Почта "${data.email}" уже используется.`,
            });
          }
          console.log(rVal);
          throw new HttpException(rVal, HttpStatus.CONFLICT);
        }
      });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() data: IUserUpdate,
  ): Promise<User> {
    const userTmp = await this.usersService.getUserById(id);
    if (userTmp) {
      const uDto = new UserUpdateDto(data);
      if (uDto.newPassword && uDto.oldPassword) {
        if (
          await this.usersService.checkAuthUser(
            userTmp.username,
            data.oldPassword,
          )
        ) {
          return this.usersService.updateById(id, uDto.getUserDto());
        } else {
          throw new HttpException(
            'Старый пароль указан неверно',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        return this.usersService.updateById(id, uDto.getUserDto());
      }
    } else {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAll(): Promise<{ deletedCount: number }> {
    return this.usersService.deleteAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteById(id);
  }
}
