import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToursDto } from 'src/dto/tours-dto';
import { Tour, TourDocument } from 'src/schemas/tour';
import { DeleteResult } from 'mongodb';
import { faker } from '@faker-js/faker/locale/ru';
import { ITourClient } from 'src/interfaces/Tour';

const imgNames = [
    "ocean.jpg",
    "pic1.jpg",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.jpg",
    "pic5.jpg",
    "pic6.jpg",
    "pic7.jpg",
    "pic8.jpg",
    "pic9.jpg"
];

@Injectable()
export class ToursService {
    private toursCount = 10;
    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) { }
    async initTours(): Promise<ToursDto[]> {
        const cnt = await this.tourModel.countDocuments().exec();
        for(let i = cnt; i <= this.toursCount + cnt; i++){
            const tour = new ToursDto({
                name: faker.location.country(),
                description: faker.lorem.paragraph(),
                tourOperator: faker.company.name(),
                price: "" + Math.round(Math.random() * (3000 - 300) + 300),
                img: '/assets/img/'+imgNames[Math.floor(Math.random() * 10)],
                type: 'test-type ' + i,
                date: 'test-data ' + i,
                id: 'id-' + i
            });
            const tourData = new this.tourModel( tour );
            tourData.save();
        }
        return this.tourModel.find<ToursDto>();
    }

    async getAllTours(): Promise<ToursDto[]> {
        return this.tourModel.find<ToursDto>();
    }
    async getOneTour( id:string ): Promise<ToursDto> {
        const tour = await this.tourModel.findOne( {id: id} ).exec();
        if (tour){
            return new ToursDto(tour);
        }else{
            throw new HttpException(
                "Тур не найден!",
                HttpStatus.NOT_FOUND
            );
        }
    }
    deleteAll(): Promise<DeleteResult>{
        return this.tourModel.deleteMany();
    }
    async uploadTour( body: ITourClient ): Promise<ToursDto> {
        const tDTO = new ToursDto( body );
        const tourData = new this.tourModel( tDTO );
        tourData.save();
        tourData.id = 'auto-' + tourData._id;
        tourData.updateOne();
        return new ToursDto( tourData );
    }

    async getToursByName(name: string): Promise<ToursDto[]> { 
        return this.tourModel.find<ToursDto>({name: {'$regex':name, '$options':"i"}});
    }
}
