import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}
    @Get()
    getAllUser(): string {
        return this.usersService.getAllUsers();
    }

    @Get(":id")
    getUserId(@Param('id') id: string): string {
        return this.usersService.getUserById(id);
    }
    @Post()
    sendUser(): string {
        return this.usersService.addUser();
    }
    @Put(":id")
    updateUserById(@Param('id') id: string ): string {
        return this.usersService.updateById(id);
    }
    @Delete()
    deleteAll(): string {
        return this.usersService.deleteAllUser();
    }
    @Delete(":id")
    deleteUserById(@Param('id') id: string): string {
        return this.usersService.deleteById(id);
    }

}
