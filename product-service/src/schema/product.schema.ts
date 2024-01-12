import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedArraySubdocument } from "mongoose";

export type ProductDocument = HydratedArraySubdocument<Product>


@Schema()
export class Product {
	@Prop()
	productName: string

	@Prop()
	price: number

	@Prop()
	description: string

	@Prop()
	brand: string

	@Prop()
	category: string

	@Prop()
	image: string[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)