import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/interfaces/user';
import { hashSync, genSaltSync } from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser{
    @Prop({required:true})
    username: string;

    @Prop({required:true})
    realname: string;
    
    @Prop({required:true, minlength:8})
    pswd: string;

    @Prop({required:true})
    email: string;

    @Prop()
    cardNumber: string;

  //  @Prop()
  //  _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save',function(next,data){
    if (this.isNew){
        console.log('Hashing password\n');
        this.pswd = hashSync(this.pswd, genSaltSync());
    }
    next();
});