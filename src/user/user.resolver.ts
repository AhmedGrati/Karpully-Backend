import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(returns => [User])
  findAll() {
    return this.userService.findAll();
  }

  @Query(returns => User)
  findOne(@Args('id') id: number) {
    // const user: User = new User(id, "ahmedgrati","ahmed","grati",20);
    // return user;
    //return this.userService.findOne(id);
  }

  @Mutation(returns => User)
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(returns => User)
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
