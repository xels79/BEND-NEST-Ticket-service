import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {ITour} from "../interfaces/Tour";
import { ToursDto } from 'src/dto/tours-dto';

export type TourDocument = HydratedDocument<Tour>;

@Schema()
export class Tour implements ITour {
    @Prop() name: string;

    @Prop() description: string;

    @Prop() tourOperator: string

    @Prop() price: string

    @Prop() img: string;

    @Prop() id: string;

    @Prop() type: string

    @Prop() date: string
}

export const ToursSchema = SchemaFactory.createForClass(Tour);

ToursSchema.post('find',function(docs){
    //console.log(docs);
    if (Array.isArray(docs)){
        for(let i=0; i<docs.length;i++){
            docs[i] = new ToursDto(docs[i]);
        }
    }
    //console.log(docs);
});