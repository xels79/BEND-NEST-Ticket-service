import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToursDto } from 'src/dto/tours-dto';
import { ITour } from 'src/interfaces/Tour';
import { Tour, TourDocument } from 'src/schemas/tour';
import { DeleteResult } from 'mongodb';

@Injectable()
export class ToursService {
    private toursCount = 10;
    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) { }
    async generateTours(): Promise<ITour[]> {
        for(let i = 0; i <= this.toursCount; i++){
            const tour = new ToursDto({
                name: 'test_' + i,
                description: 'test-description_' + i,
                tourOperator: 'test-operator ' + i,
                price: 'test-price ' + i,
                img: 'test-img-path ' + i,
                type: 'test-type ' + i,
                date: 'test-data ' + i,
                id: 'test-id ' + i
            });
            const tourData = new this.tourModel( tour );
            tourData.save();
        }
        return this.tourModel.find<ITour>();
    }
    deleteAll(): Promise<DeleteResult>{
        return this.tourModel.deleteMany();
    }

}
