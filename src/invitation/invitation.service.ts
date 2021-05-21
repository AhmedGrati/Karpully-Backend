import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {UserService} from '../user/user.service';
import {Repository} from 'typeorm';
import {CreateInvitationInput} from './dto/create-invitation.input';
import {UpdateInvitationInput} from './dto/update-invitation.input';
import {Invitation} from './entities/invitation.entity';
import {
  ACTION_NOT_FOUND,
  INVITATION_ERROR_MESSAGE,
  INVITATION_MANAGING_ERROR_MESSAGE,
  INVITATION_NOT_FOUND_ERROR_MESSAGE,
  REDUNDANT_INVITATION_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} from '../utils/constants';
import {NotificationService} from '../notification/notification.service';
import {
  acceptInvitationNotificationMessage,
  sendInvitationNotificationMessage,
} from '../utils/notification-messages';
import {InvitationStatusEnum} from './entities/invitation-status.enum';
import {InvitationActionEnum} from './dto/invitation-action.enum';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}
  async create(createInvitationInput: CreateInvitationInput, owner: User) {
    const {receiverId} = createInvitationInput;
    const receiver = await this.userService.internalFindOne(receiverId);
    if (!receiver) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MESSAGE);
    } else if (receiverId == owner.id) {
      throw new BadRequestException(INVITATION_ERROR_MESSAGE);
    } else {
      const existedInvitation = await this.findOneByUserIds(
        owner.id,
        receiverId,
      );
      // it could not be multiple invitations between two users
      if (existedInvitation) {
        throw new BadRequestException(REDUNDANT_INVITATION_ERROR_MESSAGE);
      } else {
        const invitation = await this.invitationRepository.create();
        invitation.sender = owner;
        invitation.receiver = receiver;
        // send notification
        await this.sendNotification(receiver, owner);
        return await this.invitationRepository.save(invitation);
      }
    }
  }
  async sendNotification(receiver: User, owner: User) {
    const notification = await this.notificationService.create(
      receiver,
      sendInvitationNotificationMessage(owner),
      owner.id,
    );
    this.notificationService.publishNotification(notification);
  }

  async findOneByUserIds(ownerId: number, receiverId: number) {
    const invitation = await this.invitationRepository
      .createQueryBuilder('invitation')
      .leftJoinAndSelect('invitation.sender', 'sender')
      .leftJoinAndSelect('invitation.receiver', 'receiver')
      .andWhere('sender.id = :ownerId or sender.id = :receiverId', {
        ownerId,
        receiverId,
      })
      .andWhere('receiver.id = :receiverId or receiver.id = :ownerId', {
        receiverId,
        ownerId,
      })
      .printSql()
      .getOne();
    return invitation;
  }

  async manageInvitation(
    receiver: User,
    invitationId: number,
    action: InvitationActionEnum,
  ) {
    const invitation: Invitation = await this.findOne(invitationId);
    if (invitation) {
      // A user cannot manage invitation which is already accepted or rejected
      if (invitation.status === InvitationStatusEnum.PENDING) {
        if (action === InvitationActionEnum.ACCEPT) {
          return await this.acceptInvitation(
            invitation,
            receiver,
            invitationId,
          );
        } else if (action === InvitationActionEnum.REJECT) {
          return await this.refuseInvitation(
            invitation,
            receiver,
            invitationId,
          );
        } else {
          throw new BadRequestException(ACTION_NOT_FOUND);
        }
      } else {
        throw new BadRequestException(INVITATION_MANAGING_ERROR_MESSAGE);
      }
    } else {
      throw new NotFoundException(INVITATION_NOT_FOUND_ERROR_MESSAGE);
    }
  }
  // receiver is the receiver of the invitation
  async acceptInvitation(invitation, receiver: User, invitationId: number) {
    if (invitation.sender.id == receiver.id) {
      throw new BadRequestException(INVITATION_MANAGING_ERROR_MESSAGE);
    }
    // push notification
    const notification = await this.notificationService.create(
      invitation.sender,
      acceptInvitationNotificationMessage(receiver),
      receiver.id,
    );

    // add the sender of the invitation as a friend of receiver
    await this.userService.addFriend(receiver.id, invitation.sender.id);
    // update the invitation status
    invitation.status = InvitationStatusEnum.ACCEPTED;
    this.notificationService.publishNotification(notification);
    return await this.invitationRepository.save(invitation);
  }

  async refuseInvitation(
    invitation: Invitation,
    receiver: User,
    invitationId: number,
  ) {
    if (invitation.sender.id == receiver.id) {
      throw new BadRequestException(INVITATION_MANAGING_ERROR_MESSAGE);
    }
    invitation.status = InvitationStatusEnum.REJECTED;
    return await this.invitationRepository.save(invitation);
  }
  // findAll() {
  //   return `This action returns all invitation`;
  // }

  async findOne(id: number): Promise<Invitation> {
    return this.invitationRepository.findOne({where: {id}});
  }

  // update(id: number, updateInvitationInput: UpdateInvitationInput) {
  //   return `This action updates a #${id} invitation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} invitation`;
  // }
}
