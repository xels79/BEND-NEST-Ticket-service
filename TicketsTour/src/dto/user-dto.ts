import { IUser } from "src/interfaces/user";

export class UserDto implements IUser {
    pswd: string;
    cardNumber: string;
    username: string;
    email: string;
    id: string;
}