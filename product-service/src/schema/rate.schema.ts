import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedArraySubdocument } from "mongoose";
import { User } from "./user.schema";
import { Product } from "./product.schema";

export type RateDocument = HydratedArraySubdocument<Rate>


@Schema({timestamps: true})
export class Rate {
	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	userId: User

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
	productId: Product

	@Prop()
	comment: string

	@Prop()
	rate: number
}

export const RateSchema = SchemaFactory.createForClass(Rate)