import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidateObjectIdPipe } from 'src/pipes/validateObjectId.pipe';
import { ArgumentMetadata } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => String }, ValidateObjectIdPipe) id: string,
  ): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User | null> {
    // Manually apply the validation pipe
    const validateObjectIdPipe = new ValidateObjectIdPipe();
    validateObjectIdPipe.transform(updateUserInput.id);

    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => String }, ValidateObjectIdPipe) id: string,
  ): Promise<User | null> {
    return this.userService.remove(id);
  }
}
