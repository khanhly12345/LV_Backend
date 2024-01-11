import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { GoogleDriveService } from 'src/googledrive/googledrive.service';

@Controller('products')
export class ProductController {
  constructor(private readonly ggDriveService: GoogleDriveService) {}

  //   @Post('image')
  //   @UseInterceptors(AnyFilesInterceptor())
  //   async uploadImage(@Req() req) {
  // 	console.log(req.files)
  // 	// const link = await this.ggDriveService.uploadImage(file.buffer, file.originalname);
  // 	// return link
  // 	return "hello"
  //   }
  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImages(@UploadedFiles() files, @Body() data) {
    const fileIds = [];

    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileId = await this.ggDriveService.uploadImage(file.buffer, file.originalname);
        fileIds.push(fileId);
        console.log(`File ${index + 1} uploaded. File ID: ${fileId}`);
      }
    }
	data = {
		...data,
		price: parseInt(data['price']),
		quantity: parseInt(data['quantity']),
		image: fileIds
	}

	console.log(data)
    return 'No files uploaded';
  }
}
