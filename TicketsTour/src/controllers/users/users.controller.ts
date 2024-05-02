import { Body, Controller, Delete, Get, Param, Post, Put, ValidationError } from '@nestjs/common';
import { UserDto } from 'src/dto/user-dto';
import { IErrorMessage } from 'src/interfaces/IErrorMessage';
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
    @Post(":username")
    authUser(@Body() data: UserDto, @Param('username') username): Promise<User | IErrorMessage[]>  {
        return this.usersService.checkAuthUser(username, data.pswd).then((queryRes) => {
            if (queryRes.length !== 0) {
                return queryRes[0];
            } else {
                const errText = "Неправильный логин или пароль.";
                console.log(errText);
                return [
                    {fieldName:'', message:errText},
                ];
            }
        });

    }
    @Post()
    sendUser(@Body() data: UserDto ):  Promise<User | IErrorMessage[]> {
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
                    return [{fieldName:'', message:err.message}];
                }
            }else{
                const fieldName = queryRes[0].email===data.email?'email':'username';
                const errText = queryRes[0].email===data.email
                                ?`Почта "${data.email}" уже используется.`
                                :`Пользователь с таким именем уже существует!`;
                console.log(errText);
                return [{isError:true, fieldName:fieldName, message:errText}];
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
