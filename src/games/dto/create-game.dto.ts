//DTOs are used to represent data that is sent to or received from a client

import { Genre } from '../schemas/game.schema';

export class CreateGameDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly genre: Genre;
  readonly releaseDate: Date;
}
