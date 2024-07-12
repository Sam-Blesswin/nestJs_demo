import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true, unique: true })
  userName: string;

  @Field()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
