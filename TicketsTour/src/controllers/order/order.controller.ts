import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderDto } from 'src/dto/order-dto';
import { IOrder } from 'src/interfaces/order';
import { JwtAuthGuard } from 'src/services/Authentication/jwt-auth.guard/jwt-auth.guard';
import { OrderService } from 'src/services/order/order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    initTours(@Body() data: IOrder) {
        const orderData = new OrderDto( data );
        this.orderService.sendOrder( orderData );
    }
}
