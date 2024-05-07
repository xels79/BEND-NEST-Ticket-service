import { IUser } from "src/interfaces/user";

export class UserDto implements IUser {
    pswd: string;
    cardNumber: string;
    username: string;
    email: string;
    //_id: string;
    constructor({
        pswd,
        cardNumber="",
        username,
        email
       // _id
    }:IUser){
        this.pswd = pswd;
        this.cardNumber = cardNumber;
        this.username = username;
        this.email = email;
 //       this._id = _id;
    }
}