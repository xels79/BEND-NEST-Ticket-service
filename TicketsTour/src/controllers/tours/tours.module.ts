import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, ToursSchema } from 'src/schemas/tour';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from 'src/services/Authentication/jwt-strategy/jwt-strategy.service';
import { ToursService } from 'src/services/tours/tours.service';
import { jwtConstants } from 'src/static/private/constants';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Tour.name, schema: ToursSchema}]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    })
  ],
  controllers: [ToursController],
  providers: [
    ToursService,
    JwtStrategyService
  ]
}) 
export class ToursModule {} 
