import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourDocument } from 'src/schemas/tour';

@Injectable()
export class ToursService {
    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) { }
}
