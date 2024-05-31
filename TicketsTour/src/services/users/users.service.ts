import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { LSUserDto, SendingUserDTO, UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/schemas/user';
import { compare } from 'bcrypt';
import { ILSUser, IUser } from 'src/interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
    private user:LSUserDto = null;
    private userSubject = new BehaviorSubject<LSUserDto | null>(null);
    readonly $userSubject = this.userSubject.asObservable();

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ){
        this.userSubject.subscribe( (user)=>{
            this.user = user;
        } )
        console.log('UserService start up.'); 
    }
    setUser(user: IUser):void {
        this.userSubject.next(new LSUserDto( user ));
    }
    getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }
    getUserById(id:string): Promise<User> {
        return this.userModel.findById(id); 
    }
    async getUserByUsername(username:string): Promise<UserDto> {
        const user:IUser = await this.userModel.findOne({ username:username });
        if (user){
            return new UserDto(user);
        }else{
            return null
        }
        // return this.userModel.findOne({ username:username }); 
    }
    async addUser(data:UserDto): Promise<User> {
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
    async login():Promise<ILSUser>{
        const payload = { username: this.user.username, sub: this.user.email };
        return { access_token: this.jwtService.sign( payload ), user: new LSUserDto(this.user) };
    }
    async checkAuthUser(username: string, psw: string): Promise<User | null> {
        const user = await this.userModel.findOne({username: username});
        if (!user){
            return null;
        }
        if (!await compare(psw, user.pswd)){ 
            return null;
        }
        return user;
    }

    async checkRegUser(username: string, email: string): Promise<User[]> {
        console.log('checkRegUser:',username,email);
        return (await this.userModel.find().or([{username: username}, {email:email}]));
    }

}
