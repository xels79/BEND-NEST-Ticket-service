import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
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
    async initTours(@Body() data: IOrder) {
        const orderData = new OrderDto( data );
        try{
            await this.orderService.sendOrder( orderData );
        }catch(error){
            let mess='';
            for (let k in error.errors){
                console.log(k, error.errors[k]?.properties);
                mess+= error.errors[k]?.properties?error.errors[k]?.properties.message  :'';
            }
            throw new HttpException(mess,HttpStatus.BAD_REQUEST);
        }
        
    }
    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async getOrdersByUser(@Param('userId') userId: string): Promise<any> {
        let rv = this.orderService.getOrdersByUser(userId);
        console.log('Order:\n',rv);
        return rv ;
    }
}
