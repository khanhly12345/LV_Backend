import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedArraySubdocument } from 'mongoose';
import { User } from './user.schema';

export type OrderDocument = HydratedArraySubdocument<Order>

@Schema()
export class Order  {
  @Prop()
  items: string;

  @Prop()
  total: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);