//DTOs are used to represent data that is sent to or received from a client

import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Genre } from '../schemas/game.schema';
import { Type } from 'class-transformer';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGameDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @Field()
  @IsString()
  readonly description: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @Field(() => Genre)
  @IsEnum(Genre, { message: 'Valid Genre Required' })
  @IsNotEmpty()
  readonly genre: Genre;

  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  readonly releaseDate: Date;
}
