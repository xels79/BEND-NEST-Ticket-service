import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './controllers/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ToursModule } from './controllers/tours/tours.module';
import { OrderModule } from './controllers/order/order.module';
import { TourItemModule } from './controllers/tour-item/tour-item.module';

//'mongodb://localhost/nest'
//mongodb://main:02389main@188.225.84.135:27017/?authMechanism=DEFAULT&authSource=nest
@Module({
  imports: [
    UsersModule,
    ToursModule,
    OrderModule,
    TourItemModule,
    MongooseModule.forRoot('mongodb://main:02389main@188.225.84.135:27017/nest?authMechanism=DEFAULT&authSource=nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
