import { IUser } from "src/interfaces/user";
export class SendingUserDTO{
    cardNumber: string;
    username: string;
    realname: string;
    email: string;
    constructor(data:IUser){
        if (data){
            this.cardNumber = data.cardNumber ? data.cardNumber : "";
            this.username = data.username.trim();
            this.email = data.email; 
            this.realname = data.realname.trim();
        }
    }
}
export class LSUserDto extends SendingUserDTO implements IUser{
    _id: string | undefined;
    constructor(data:IUser){ 
        super(data);
        if (data){
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