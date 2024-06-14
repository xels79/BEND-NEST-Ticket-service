import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MixedData, OrderDto, OrderPublicDto } from 'src/dto/order-dto';
import { Order, OrderDocument } from 'src/schemas/order';
import { ToursService } from '../tours/tours.service';
import { ToursDto } from 'src/dto/tours-dto';
import { IOrder } from 'src/interfaces/order';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private toursService: ToursService,
  ) {}

  async sendOrder(data: OrderDto): Promise<Order> {
    const orderData = new this.orderModel(data);
    return orderData.save();
  }

  async getOrdersByUser(userId: string): Promise<MixedData[]> {
    const dt = await this.orderModel
      .find({ userId: userId })
      .then((data) =>
        data.map((item: OrderDto) => new OrderDto(item as IOrder)),
      );
    const dt2 = dt.map<Promise<MixedData>>(async (item) => {
      const tour: ToursDto = await this.toursService.getOneTour(item.tourId);
      return <MixedData>{ ...new OrderPublicDto(item), ...tour };
    });
    return Promise.all(dt2).then((data) => {
      return data;
    });
  }
}
