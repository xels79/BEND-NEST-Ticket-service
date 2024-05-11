import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOrder } from 'src/interfaces/order';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order implements IOrder{
    @Prop({required:true}) age: string;

    @Prop({required:true}) birthDay: string;
    
    @Prop() cardNumber: string;

    @Prop({required:true}) tourId: string;

    @Prop({required:true}) userId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
