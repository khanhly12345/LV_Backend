import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FilesInterceptor,
} from '@nestjs/platform-express';
import { GoogleDriveService } from 'src/googledrive/googledrive.service';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly ggDriveService: GoogleDriveService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImages(@UploadedFiles() files, @Body() data) {
    const fileIds = [];

    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileId = await this.ggDriveService.uploadImage(
          file.buffer,
          file.originalname,
        );
        fileIds.push(fileId);
        console.log(`File ${index + 1} uploaded. File ID: ${fileId}`);
      }
    }
    data = {
      ...data,
      price: parseInt(data['price']),
      image: fileIds,
    };
	console.log(data)
    return this.productService.createProduct(data);
  }

  @Get()
  getAllProduct() {
	return this.productService.getAllProduct()
  }

  @Get('edit/:id')
  getProductById(@Param('id') id: string) {
	return this.productService.getProductById(id)
  }

  @Post('edit/:id')
  editProduct(@Param('id') id: string, @Body() data) {
	console.log(id, data)
	return this.productService.editProduct(id, data)
  }

  @Post('delete')
  deleteImage() {
	return this.ggDriveService.deleteImage()
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
	return this.productService.deleteProduct(id)
  }

	// option product

  @Post('options/create')
  createOptions(@Body() data) {
	console.log(data)
	return this.productService.createProductOptions(data)
  }

  @Get('options/getById/:id')
  getProductOptionsById(@Param('id') id: string) {
	console.log(id)
	return this.productService.getProductOptionsById(id)
  }

	//   cart
	@Post('cart')
	getCart(@Body() cart: any) {
		return this.productService.getCart(cart)
	}
}
