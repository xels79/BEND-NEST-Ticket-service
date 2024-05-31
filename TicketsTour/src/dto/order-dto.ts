import { IOrder } from "src/interfaces/order";

export class OrderDto implements IOrder{
    age: string;
    birthDay: string;
    cardNumber: string;
    tourId: string;
    userId: string;
    constructor( data:IOrder ){
        console.log('OrderDto:',data);
        this.age = data.age;
        this.birthDay = data.birthDay;
        this.cardNumber = data.cardNumber;
        this.tourId = data.tourId; 
        this.userId = data.userId;
    }
}