import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
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
    deleteAllUser():  Promise<{deletedCount:number }> {
        return this.userModel.deleteMany();
    }
    deleteById( id:string ): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
    }
    updateById(id:string, data:User ): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, data);
    }
    async checkAuthUser(username: string, psw: string): Promise<User[]> {
        return this.userModel.find({username: username, pswd: psw});
    }

    async checkRegUser(username: string, email: string): Promise<User[]> {
        console.log('checkRegUser:',username,email);
        return (await this.userModel.find().or([{username: username}, {email:email}]));
    }

}
