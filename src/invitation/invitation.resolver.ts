import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {InvitationService} from './invitation.service';
import {Invitation} from './entities/invitation.entity';
import {CreateInvitationInput} from './dto/create-invitation.input';
import {UpdateInvitationInput} from './dto/update-invitation.input';
import {Auth} from '../shared/decorators/auth.decorator';
import {UserRoleEnum} from '../user/entities/user-role.enum';
import {CurrentUser} from '../shared/decorators/current-user.decorator';
import {User} from '../user/entities/user.entity';

@Resolver(() => Invitation)
export class InvitationResolver {
  constructor(private readonly invitationService: InvitationService) {}

  @Mutation(() => Invitation)
  @Auth(UserRoleEnum.USER)
  createInvitation(
    @Args('createInvitationInput') createInvitationInput: CreateInvitationInput,
    @CurrentUser() owner: User,
  ) {
    return this.invitationService.create(createInvitationInput, owner);
  }

  @Query(() => [Invitation], {name: 'invitation'})
  findAll() {
    return this.invitationService.findAll();
  }

  @Query(() => Invitation, {name: 'invitation'})
  findOne(@Args('id', {type: () => Int}) id: number) {
    return this.invitationService.findOne(id);
  }

  @Mutation(() => Invitation)
  updateInvitation(
    @Args('updateInvitationInput') updateInvitationInput: UpdateInvitationInput,
  ) {
    return this.invitationService.update(
      updateInvitationInput.id,
      updateInvitationInput,
    );
  }

  @Mutation(() => Invitation)
  removeInvitation(@Args('id', {type: () => Int}) id: number) {
    return this.invitationService.remove(id);
  }
}
