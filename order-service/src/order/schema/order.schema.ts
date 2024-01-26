import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedArraySubdocument } from 'mongoose';
import { User } from './user.schema';
import { ProductOption } from './productOption.schema';

export type OrderDocument = HydratedArraySubdocument<Order>;

@Schema()
export class Item  {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductOption', _id: false })
  item: ProductOption;

  @Prop({ required: true })
  quantity: number;
}

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: [Item] })
  items: Item[]

  @Prop({
    type: {
      status: { type: String },
      method: { type: String },
    },
	_id: false
  })
  payment: {
	status: string,
	method: string,
  }

  @Prop({ default: 'PENDING'})
  status: string;

  @Prop()
  total: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
