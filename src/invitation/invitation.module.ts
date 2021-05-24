import {Module} from '@nestjs/common';
import {InvitationService} from './invitation.service';
import {InvitationResolver} from './invitation.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from '../user/user.module';
import {Invitation} from './entities/invitation.entity';
import {NotificationModule} from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    UserModule,
    NotificationModule,
  ],
  providers: [InvitationResolver, InvitationService],
})
export class InvitationModule {}
