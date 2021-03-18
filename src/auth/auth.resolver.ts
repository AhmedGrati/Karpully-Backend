import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenModel } from './dto/token.model';
import { CredentialsInput } from './dto/credentials.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => TokenModel)
  login(@Args('credentialsInput') credentialsInput: CredentialsInput) {
    return this.authService.login(credentialsInput);
  }
  
}
