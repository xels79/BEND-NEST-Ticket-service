import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put,Request, Headers, UseGuards, ValidationError } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BehaviorSubject } from 'rxjs';
import { LSUserDto, UserDto } from 'src/dto/user-dto';
import { IErrorMessage } from 'src/interfaces/IErrorMessage';
import { ILSUser, IUser } from 'src/interfaces/user';
import { User } from 'src/schemas/user';
import { JwtAuthGuard } from 'src/services/Authentication/jwt-auth.guard/jwt-auth.guard';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {

    private userSubject = new BehaviorSubject<LSUserDto | null>(null);
    readonly $userSubject = this.userSubject.asObservable();

    constructor (private usersService: UsersService) {}
    //
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUser(@Request() req): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(":id")
    getUserId(@Param('id') id: string):  Promise<User> {
        return this.usersService.getUserById(id);
    }

    @UseGuards(AuthGuard('local'))
    @Post(":username")
    authUser(@Body() data: IUser, @Param('username') username): Promise<ILSUser> {
        return this.usersService.login( data );
    }
    
    //@UseGuards(JwtAuthGuard)
    @Post()
    sendUser(@Body() _data: IUser ):  Promise<ILSUser | IErrorMessage[]> {
        const data = new UserDto( _data );
        console.log(data);
        return this.usersService.checkRegUser(data.username, data.email).then(async (queryRes)=>{
            console.log('data reg:',queryRes);
            if (!queryRes.length){
                try{

                    this.userSubject.next( new LSUserDto((await this.usersService.addUser( data )) as IUser ));
                    return this.usersService.login( (await this.usersService.addUser( data )) as IUser );
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
