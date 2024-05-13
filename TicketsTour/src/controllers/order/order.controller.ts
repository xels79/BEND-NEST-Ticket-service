import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
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
    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async getOrdersByUser(@Param('userId') userId: string): Promise<any> {
        let rv = this.orderService.getOrdersByUser(userId);
        console.log('Order:\n',rv);
        return rv
    }
}
