import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, ValidationError } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';
import { UserDto } from 'src/dto/user-dto';
import { IErrorMessage } from 'src/interfaces/IErrorMessage';
import { IUser } from 'src/interfaces/user';
import { User } from 'src/schemas/user';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}
    @Get()
    getAllUser(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(":id")
    getUserId(@Param('id') id: string):  Promise<User> {
        return this.usersService.getUserById(id);
    }

    @UseGuards(AuthGuard('local'))
    @Post(":username")
    authUser(@Body() data: IUser, @Param('username') username): Promise<{ access_token: string }> {
        return this.usersService.login(new UserDto( data ));
    }
    @Post()
    sendUser(@Body() _data: IUser ):  Promise<User | IErrorMessage[]> {
        const data = new UserDto( _data );
        console.log(data);
        return this.usersService.checkRegUser(data.username, data.email).then(async (queryRes)=>{
            console.log('data reg:',queryRes);
            if (!queryRes.length){
                try{
                    const rVal = (await this.usersService.addUser( data )) as User;
                    return rVal;
                }catch(err){
                    const error:ValidationError = err;
                    console.log(error);
                    console.log(err.message);
                    throw new HttpException(
                        [{fieldName:'', message:err.message}],
                        HttpStatus.INTERNAL_SERVER_ERROR
                    );
                }
            }else{
                const rVal:IErrorMessage[] = []
                if (queryRes[0].username === data.username){
                    rVal.push({fieldName:'username', message:'Пользователь с таким именем уже существует!'});
                }
                if (queryRes[0].email == data.email){
                    rVal.push({fieldName:'email', message:`Почта "${data.email}" уже используется.`});
                }
                console.log(rVal);
                throw new HttpException(
                    rVal,
                    HttpStatus.CONFLICT,
                );
            }
        })
    }
    @Put(":id")
    updateUserById(@Param('id') id: string,@Body() data:User ): Promise<User> {
        return this.usersService.updateById(id, data);
    }
    @Delete()
    deleteAll(): Promise<{deletedCount:number }> {
        return this.usersService.deleteAllUser();
    }
    @Delete(":id")
    deleteUserById(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteById(id);
    }

}
