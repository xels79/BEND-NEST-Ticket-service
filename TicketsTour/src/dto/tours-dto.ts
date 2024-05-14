import { ITour, ITourClient } from "src/interfaces/Tour";

export class ToursDto implements ITour{
    name:string;
    description:string;
    tourOperator:string;
    price:string;
    img:string;
    id:string;
    type: string;
    date: string;
    constructor(data:ITour) {
        this.name = data.name?data.name:"";
        this.description = data.description?data.description:"";
        this.tourOperator = data.tourOperator?data.tourOperator:"";
        this.price = data.price?data.price:"";
        this.img = data.img?data.img:"";
        this.type = data.type?data.type:"";
        this.date = data.date?data.date:"";
        this.id = data.id;
    }
}
