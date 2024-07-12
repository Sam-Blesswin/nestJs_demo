import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = new this.userModel(createUserInput);
    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User | null> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserInput, { new: true })
      .exec();
  }

  async remove(id: number): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
