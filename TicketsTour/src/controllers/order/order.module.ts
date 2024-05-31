import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order';
import { OrderService } from 'src/services/order/order.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/private/constants';
import { JwtStrategyService } from 'src/services/Authentication/jwt-strategy/jwt-strategy.service';
import { ToursService } from 'src/services/tours/tours.service';
import { Tour, ToursSchema } from 'src/schemas/tour';
import { User, UserSchema } from 'src/schemas/user';
import { UsersService } from 'src/services/users/users.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name:Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Tour.name, schema: ToursSchema}]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  controllers: [OrderController],
  providers: [OrderService, ToursService,UsersService, JwtStrategyService]
})
export class OrderModule {} 
