import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){
        console.log('UserService start up.');
    }
    getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }
    getUserById(id:string): Promise<User> {
        return this.userModel.findById(id);
    }
    addUser(data): Promise<User> {
        const userData = new this.userModel(data);
        return userData.save();
    }
    deleteAllUser(): string {
        return "UService delete all";
    }
    deleteById( id:string ): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
    }
    updateById(id:string ): Promise<User> {
        return this.userModel.findByIdAndUpdate(id);
    }
}
