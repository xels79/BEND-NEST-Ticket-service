import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderDto } from 'src/dto/order-dto';
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

// OrderSchema.post('find',function(docs){
//     if (Array.isArray(docs)){
//         for(let i=0; i<docs.length;i++){
//             docs[i] = new OrderDto(docs[i]);
//         }
//     }
// });