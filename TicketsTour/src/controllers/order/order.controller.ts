import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MixedData, OrderDto } from 'src/dto/order-dto';
import { IOrder } from 'src/interfaces/order';
import { JwtAuthGuard } from 'src/services/Authentication/jwt-auth.guard/jwt-auth.guard';
import { OrderService } from 'src/services/order/order.service';
import { UsersService } from 'src/services/users/users.service';

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
        private usersService: UsersService
    ) { }

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
    @Get(':username')
    async getOrdersByUser(@Param('username') username: string): Promise<MixedData[]> {
        const user = (await this.usersService.getUserByUsername(username));
        if (user){
            let rv = this.orderService.getOrdersByUser(user._id);
            console.log('Order:\n',rv);
            return rv
        }
        console.error("Пользователь не найден", user);
        throw new HttpException("Пользователь не найден",HttpStatus.NOT_FOUND);
    }
}
