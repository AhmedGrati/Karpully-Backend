import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { forwardRef, Inject, Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../shared/guards/gql-auth-guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { AuthService } from '../auth/auth.service';
import { CredentialsInput } from '../auth/dto/credentials.input';
import { Roles } from '../shared/decorators/roles.decorator';
import { UserRoleEnum } from './entities/user-role.enum';
import { RolesGuard } from '../shared/guards/roles.guards';
import { Auth } from '../shared/decorators/auth.decorator';


@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService, 
    private readonly authService:  AuthService     
    ) {}

  @Mutation(returns => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) { 
    return this.userService.create(createUserInput);
  }

  @Query(returns => [User])
  @Auth(UserRoleEnum.ADMIN)
  findAll(@CurrentUser() user: User) {
    return this.userService.findAll();
  }

  @Query(returns => User)
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
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
