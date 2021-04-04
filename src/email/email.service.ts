import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository, ConnectionManager } from 'typeorm';
import { CreateEmailInput } from './dto/create-email.input';
import { UpdateEmailInput } from './dto/update-email.input';
import { Email } from './entities/email.entity';
import { EmailTypeEnum } from './entities/email-type.enum';
import { join } from 'path';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email) private readonly emailRepository: Repository<Email>,
    private readonly mailerService: MailerService
  ) {}
  async create(createEmailInput: Email): Promise<Email> {
    const email = this.emailRepository.create(createEmailInput);
    return await this.emailRepository.save(email);
  }

  async findAll(): Promise<Email[]> {
    return await this.emailRepository.find();
  }

  async findOne(id: number): Promise<Email> {
    return await this.emailRepository.findOne({where:{id}});
  }

  async findAllByUserId(userId: number): Promise<Email[]> {
    return await this.emailRepository.createQueryBuilder("email")
    .where("email.sender.id = :userId", {userId}).getMany();
  }

  async sendEmail(user: User, emailType: EmailTypeEnum) {
    // create a new email and register it in the database

    const email = new Email()
      .setSender(user)
      .setEmailType(emailType)
      .setDate(new Date());

    const createdEmail = await this.create(email);
    Logger.log(createdEmail.sender, "EMAIL SERVICE");

    Logger.log(user.email, "EMAIL SERVICE");

    // build the email and send it
    this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome To Karpully! Happy To See You Among Us!',
      text: `Hello ${user.username}`,
      template: join(process.cwd(), 'src/templates/confirmation'),
    })
    .then(() => {})
    .catch((err) => {
      Logger.log(err,"SENDING EMAIL ERROR!");
    });
    Logger.log("SENT EMAIL","EMAIL SERVICE");
  }
}
