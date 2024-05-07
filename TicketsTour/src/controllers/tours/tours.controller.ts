import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ITour } from 'src/interfaces/Tour';
import { JwtAuthGuard } from 'src/services/Authentication/jwt-auth.guard/jwt-auth.guard';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {
    constructor(private toursService: ToursService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTours(): Promise<ITour[]> {
        return this.toursService.generateTours();
    }
    @Get(":remove")
    removeAllTours( @Param('remove') remove): any {
        console.log( 'remove' );
        return this.toursService.deleteAll();
    }
}
