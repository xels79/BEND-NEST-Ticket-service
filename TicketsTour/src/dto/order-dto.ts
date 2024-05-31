import { IOrder } from "src/interfaces/order";
import { ToursDto } from "./tours-dto";

export class OrderPublicDto{
    age: string;
    birthDay: string;
    constructor( data:IOrder ){
        this.age = data.age;
        this.birthDay = data.birthDay;
    }
}
export class OrderDto extends OrderPublicDto implements IOrder{
    cardNumber: string;
    tourId: string;
    userId: string;
    constructor( data:IOrder ){
        super(data);
        this.cardNumber = data.cardNumber;
        this.tourId = data.tourId; 
        this.userId = data.userId;
    }
}

export type MixedData = ToursDto | OrderDto;