import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;
}
