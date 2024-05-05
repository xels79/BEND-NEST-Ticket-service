import { IUser } from "src/interfaces/user";

export class UserDto implements IUser {
    pswd: string;
    cardNumber: string;
    username: string;
    email: string;
    id: string;
    constructor({
        pswd,
        cardNumber="",
        username,
        email,
        id
    }){
        this.pswd = pswd;
        this.cardNumber = cardNumber;
        this.username = username;
        this.email = email;
        this.id = id;
    }
}