import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvitationService } from './invitation.service';
import { Invitation } from './entities/invitation.entity';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';

@Resolver(() => Invitation)
export class InvitationResolver {
  constructor(private readonly invitationService: InvitationService) {}

  @Mutation(() => Invitation)
  createInvitation(@Args('createInvitationInput') createInvitationInput: CreateInvitationInput) {
    return this.invitationService.create(createInvitationInput);
  }

  @Query(() => [Invitation], { name: 'invitation' })
  findAll() {
    return this.invitationService.findAll();
  }

  @Query(() => Invitation, { name: 'invitation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.invitationService.findOne(id);
  }

  @Mutation(() => Invitation)
  updateInvitation(@Args('updateInvitationInput') updateInvitationInput: UpdateInvitationInput) {
    return this.invitationService.update(updateInvitationInput.id, updateInvitationInput);
  }

  @Mutation(() => Invitation)
  removeInvitation(@Args('id', { type: () => Int }) id: number) {
    return this.invitationService.remove(id);
  }
}
