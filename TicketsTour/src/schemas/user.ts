import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/interfaces/user';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser{
    @Prop({required:true})
    username: string;

    @Prop({required:true, maxlength:8})
    pswd: string;

    @Prop({required:true})
    email: string;

    @Prop()
    cardNumber: string;

    @Prop()
    id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);