import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
//   @UseInterceptors(
//     FilesInterceptor('image', 5, {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, callback) => {
//           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const extension = extname(file.originalname);
//           callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
//         },
//       }),
//     }),
//   )
	@UseInterceptors(FilesInterceptor('image'))
  createProduct(@Body() data: any, @Req() req) {
    const files: Array<Express.Multer.File> = req.files;
    console.log(files);
  }
}

