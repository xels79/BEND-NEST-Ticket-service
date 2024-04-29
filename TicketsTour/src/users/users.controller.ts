import { Body, Controller, Delete, Get, Param, Post, Put, ValidationError } from '@nestjs/common';
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
    @Post()
    async sendUser(@Body() data ):  Promise<User> {
        try{
            const rVal = (await this.usersService.addUser( data )) as User;
            return rVal;
        }catch(err){
            const error:ValidationError = err;
            console.log("ОШИБКА");
            console.log(err.message);
        }
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
