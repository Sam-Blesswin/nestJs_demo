import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    try {
      const game = new this.gameModel(createGameDto);
      return await game.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Game title already exists');
      }
      throw err;
    }
  }

  async findAll(genre?: string): Promise<Game[]> {
    const filter = genre ? { genre } : {};
    return await this.gameModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameModel.findById(id).exec();
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.gameModel
      .findByIdAndUpdate(id, updateGameDto, {
        new: true,
      })
      .exec();
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async remove(id: string): Promise<Game> {
    const game = await this.gameModel.findByIdAndDelete(id).exec();
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }
}
