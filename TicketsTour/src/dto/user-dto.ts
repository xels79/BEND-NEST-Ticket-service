import { IUser } from "src/interfaces/user";

export class LSUserDto implements IUser{
    cardNumber: string;
    username: string;
    email: string;
    constructor(data:IUser){
        this.cardNumber = data.cardNumber ? data.cardNumber : "";
        this.username = data.username;
        this.email = data.email;
    }
}

export class UserDto extends LSUserDto {
    pswd: string;
    constructor(data:IUser){
        super( data );
        this.pswd = data.pswd;
    }
}