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

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsEnum(Genre, { message: 'Valid Genre Required' })
  @IsNotEmpty()
  readonly genre: Genre;

  @IsDate()
  @Type(() => Date)
  readonly releaseDate: Date;
}
