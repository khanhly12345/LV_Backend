import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedArraySubdocument } from 'mongoose';

export type UserDocument = HydratedArraySubdocument<User>;

@Schema()
export class User {

  @Prop()
  email: string;

  @Prop()
  password: string

  @Prop({ default: 'user'})
  role: string

  @Prop({ default: null})
  fullname: string

  @Prop({ default: null})
  phone: string

  @Prop({ default: null})
  city: string

  @Prop({ default: null})
  distrist: string

  @Prop({ default: null})
  moreInfor: string

}

export const UserSchema = SchemaFactory.createForClass(User);
