import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedArraySubdocument } from "mongoose";
import { Product } from "./product.schema";

export type ProductOptionDocument = HydratedArraySubdocument<ProductOption>

@Schema()
export class ProductOption {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
	productId: Product

	@Prop()
	color: string

	@Prop()
	ram: string

	@Prop()
	qanntity: number

}

export const ProductOptionSchema = SchemaFactory.createForClass(ProductOption)