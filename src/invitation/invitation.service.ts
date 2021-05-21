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
  INVITATION_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} from '../utils/constants';
import {NotificationService} from '../notification/notification.service';
import {sendInvitationNotificationMessage} from '../utils/notification-messages';

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
        throw new BadRequestException();
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
