import { IUser } from "src/interfaces/user";

export class LSUserDto implements IUser{
    cardNumber: string;
    username: string;
    realname: string;
    email: string;
    _id: string | undefined;
    constructor(data:IUser){
        if (data){
            this.cardNumber = data.cardNumber ? data.cardNumber : "";
            this.username = data.username.trim();
            this.email = data.email;
            this.realname = data.realname.trim();
            if (data._id){
                this._id = data._id;
            }
        }
    }
}

export class UserDto extends LSUserDto {
    pswd: string;
    constructor(data:IUser){
        super( data );
        if (data){
            this.pswd = data.pswd;
        }
    }
}