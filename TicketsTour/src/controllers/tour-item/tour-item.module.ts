import { Module } from '@nestjs/common';
import { TourItemController } from './tour-item.controller';
import { ToursService } from 'src/services/tours/tours.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/private/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, ToursSchema } from 'src/schemas/tour';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Tour.name, schema: ToursSchema}]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        })    
    ],
    controllers: [TourItemController],
    providers:[ToursService]
})
export class TourItemModule {}
