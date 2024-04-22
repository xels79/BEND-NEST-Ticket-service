import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getAllUsers(): string {
        return "UService: all user";
    }
    getUserById(id:string): string {
        return "UService user id: " + id;
    }
    sendUser(): string {
        return "UService send user";
    }
}
