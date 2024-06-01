import { IUser } from "./user";

export interface IUserUpdate extends IUser{
    oldPassword:string,
    newPassword:string,
    userId:string
}