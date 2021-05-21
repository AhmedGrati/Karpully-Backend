import { Injectable } from '@nestjs/common';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';

@Injectable()
export class InvitationService {
  create(createInvitationInput: CreateInvitationInput) {
    return 'This action adds a new invitation';
  }

  findAll() {
    return `This action returns all invitation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  update(id: number, updateInvitationInput: UpdateInvitationInput) {
    return `This action updates a #${id} invitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
