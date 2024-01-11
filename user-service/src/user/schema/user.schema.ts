import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedArraySubdocument } from 'mongoose';

export type UserDocument = HydratedArraySubdocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
