import { Body, Controller } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewServce: ReviewsService){}

	@MessagePattern('create_rate')
	createRate(@Body() data) {
		return this.reviewServce.createRate(data)
	}

	@MessagePattern('get_rate')
	getRate(@Body() data) {
		return this.reviewServce.getRate(data)
	}
}
