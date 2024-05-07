import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from 'src/schemas/tour';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from 'src/services/Authentication/jwt-strategy/jwt-strategy.service';
import { ToursService } from 'src/services/tours/tours.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema}]),
    PassportModule,
    JwtModule.register({
      secret:'123456789',//jwtConstants.secret,
    })
  ],
  controllers: [ToursController],
  providers: [
    ToursService,
    JwtStrategyService
  ]
}) 
export class ToursModule {}
