import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './schemas/game.schema';
import { ValidateObjectIdPipe } from 'src/pipes/validateObjectId.pipe';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createGameDto: CreateGameDto,
  ): Promise<Game> {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  async findAll(@Query('genre') genre?: string): Promise<Game[]> {
    return this.gamesService.findAll(genre);
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body(ValidationPipe) updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string): Promise<Game> {
    return this.gamesService.remove(id);
  }
}
