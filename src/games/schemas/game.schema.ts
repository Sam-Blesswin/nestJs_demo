import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Genre {
  ACTION = 'action',
  ADVENTURE = 'adventure',
  RPG = 'rpg',
  STRATEGY = 'strategy',
  SIMULATION = 'simulation',
  RACING = 'racing',
}

registerEnumType(Genre, {
  name: 'Genre',
});

@ObjectType()
@Schema({ timestamps: true })
export class Game {
  @Field()
  @Prop({ required: true, unique: true })
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field(() => Int)
  @Prop({ required: true })
  price: number;

  @Field(() => Genre)
  @Prop({ required: true })
  genre: Genre;

  @Field(() => Date)
  @Prop()
  releaseDate: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
