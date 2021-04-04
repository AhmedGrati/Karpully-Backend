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
import { EmailVerificationInput } from '../email/dto/email-verification.input';
import { ResetPasswordInput } from '../email/dto/reset-password.input';


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
  @Auth(UserRoleEnum.USER)
  findOne(@CurrentUser() user: User,@Args('id') id: number) {
    return this.userService.findOne(user,id);
  }

  @Mutation(returns => User)
  @Auth(UserRoleEnum.USER)
  update(@CurrentUser() user:User, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(user,updateUserInput.id, updateUserInput);
  }

  @Mutation(returns => User)
  @Auth(UserRoleEnum.USER)
  remove(@CurrentUser()user:User, @Args('id') id: number) {
    return this.userService.remove(user,id);
  }

  @Mutation(returns => Boolean)
  confirmEmail(@Args('emailVerificationInput') emailVerificationInput: EmailVerificationInput) {
    return this.userService.validUserConfirmation(emailVerificationInput);
  }

  @Mutation(returns => Boolean)
  sendResetPasswordEmail(@Args('ResetPasswordInput')resetPasswordInput: ResetPasswordInput) {
    return this.userService.sendResetPasswordEmail(resetPasswordInput);
  }

}
