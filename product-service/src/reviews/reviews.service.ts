import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rate, RateDocument } from 'src/schema/rate.schema';

@Injectable()
export class ReviewsService {
	constructor(@InjectModel(Rate.name) private reviewService: Model<RateDocument>){}

	createRate(payload: any) {
		const rate = this.reviewService.create(payload.data)
		return rate;
	}

	async getRate(payload: any) {
		console.log(payload)
		const rate = await this.reviewService.find({ productId: payload.data.id}).populate('userId')
		console.log(rate)
		return rate;
	}
}
