import { LSUserDto } from "src/dto/user-dto"

export interface IUser {
    pswd?: string,
    cardNumber: string,
    username: string,
    realname: string,
    email: string,
    _id?: string   //-- добавить
}
export interface ILSUser{
    access_token: string, 
    user: LSUserDto
}
