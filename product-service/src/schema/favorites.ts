import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedArraySubdocument } from "mongoose";
import { Product } from "./product.schema";

export type FavoritesDocument = HydratedArraySubdocument<Favorites>

@Schema()
export class Favorites {

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
	productId: Product

	@Prop()
	userId: string

	@Prop()
	favorite: boolean

}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites)