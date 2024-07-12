import { CreateGameDto } from './create-game.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameDto extends PartialType(CreateGameDto) {}
