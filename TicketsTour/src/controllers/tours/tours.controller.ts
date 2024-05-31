import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ToursDto } from 'src/dto/tours-dto';
import { ITour } from 'src/interfaces/Tour';
import { JwtAuthGuard } from 'src/services/Authentication/jwt-auth.guard/jwt-auth.guard';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {
    constructor(private toursService: ToursService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    initTours(): Promise<ITour[]> {
        return this.toursService.initTours();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTours(): Promise<ITour[]> {
        return this.toursService.getAllTours();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTour(@Param('id') id: string): Promise<ToursDto> {
        return this.toursService.getOneTour(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    removeAllTours( @Param('remove') remove): any {
        console.log( 'remove' );
        return this.toursService.deleteAll(); 
    }
}
