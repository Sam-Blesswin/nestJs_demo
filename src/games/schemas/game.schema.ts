import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Genre {
  ACTION = 'action',
  ADVENTURE = 'adventure',
  RPG = 'rpg',
  STRATEGY = 'strategy',
  SIMULATION = 'simulation',
  RACING = 'racing',
}

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true, unique: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  genre: Genre;
  @Prop({ required: true })
  releaseDate: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
