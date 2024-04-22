import { Controller, Get, Param } from '@nestjs/common';
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
}
