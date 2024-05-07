import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/schemas/user';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ){
        console.log('UserService start up.');
    }
    getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }
    getUserById(id:string): Promise<User> {
        return this.userModel.findById(id); 
    }
    addUser(data:UserDto): Promise<User> {
        const userData = new this.userModel(data);
        console.log(data);
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
    async login(data:UserDto):Promise<{ access_token: string }>{
        const payload = { _id: data._id, username: data.username };
        return { access_token: this.jwtService.sign( payload) };
        //return await this.userModel.findOne({username: data.username, pswd: data.pswd})
    }
    async checkAuthUser(username: string, psw: string): Promise<User[] | null> {
        const userArray = await this.userModel.find({username: username, pswd: psw});
        return userArray.length ? userArray : null;
    }

    async checkRegUser(username: string, email: string): Promise<User[]> {
        console.log('checkRegUser:',username,email);
        return (await this.userModel.find().or([{username: username}, {email:email}]));
    }

}
