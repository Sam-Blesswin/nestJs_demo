import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Game } from './schemas/game.schema';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ValidateObjectIdPipe } from 'src/pipes/validateObjectId.pipe';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GamesService) {}

  @Query(() => [Game])
  async games(
    @Args('genre', { type: () => String, nullable: true }) genre?: string,
  ): Promise<Game[]> {
    return this.gameService.findAll(genre);
  }

  @Query(() => Game)
  async game(
    @Args('id', { type: () => String }, ValidateObjectIdPipe) id: string,
  ): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Mutation(() => Game)
  @UsePipes(ValidationPipe)
  async createGame(
    @Args('createGameDto') createGameDto: CreateGameDto,
  ): Promise<Game> {
    return this.gameService.create(createGameDto);
  }

  @Mutation(() => Game)
  @UsePipes(ValidationPipe)
  async updateGame(
    @Args('id', { type: () => String }, ValidateObjectIdPipe) id: string,
    @Args('updateGameDto') updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gameService.update(id, updateGameDto);
  }

  @Mutation(() => Game)
  async removeGame(
    @Args('id', { type: () => String }, ValidateObjectIdPipe) id: string,
  ): Promise<Game> {
    return this.gameService.remove(id);
  }
}
