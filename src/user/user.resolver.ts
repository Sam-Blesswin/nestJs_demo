import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidateObjectIdPipe } from 'src/pipes/validateObjectId.pipe';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(
    @Args('id', { type: () => String }, ValidateObjectIdPipe) id: string,
  ): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  @UsePipes(ValidationPipe)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  @UsePipes(ValidationPipe)
  updateUser(
    @Args('id', { type: () => String }, ValidateObjectIdPipe) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User | null> {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => String }, ValidateObjectIdPipe) id: string,
  ): Promise<User | null> {
    return this.userService.remove(id);
  }
}
