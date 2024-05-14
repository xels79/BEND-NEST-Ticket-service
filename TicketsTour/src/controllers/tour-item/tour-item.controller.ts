import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ITourClient } from 'src/interfaces/Tour';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tour-item')
export class TourItemController {
    static imgName: string;
    constructor( private toursService: ToursService) {}

    @Post()
    @UseInterceptors(FileInterceptor( 'img', {
        storage: diskStorage( {
            destination: './public/',
            filename: (req, file, cd)=>{
                const imgType = file.mimetype.split('/');
                const uniqueSuffix = Date.now() + '-' + Math.round( Math.random() * 1E9 );
                const imgName = file.fieldname + '-' + uniqueSuffix + '.' + imgType[1];
                cd( null, imgName );
                TourItemController.imgName = imgName;
            }
        } )
    } ))
    async createTour(@Body() body: ITourClient){
        body.img = '/public/' + TourItemController.imgName;
        return this.toursService.uploadTour( body );
    }
}
