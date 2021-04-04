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
import { v4 as uuidv4 } from 'uuid';
import { DatesOperations } from '../utils/dates-operation';
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
      .setDate(new Date())
      .setToken(uuidv4())
      .setVerificationToken(uuidv4());

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

  /* the process is to send an email which has the a url with this pattern ?token=azaze&verifToken=aazda&userId=55
  once the user open the link we should verif that the token is valid and the mail didn't expired
  we mean by expiration if the user didn't confirm the mail for at least 2 days
  we get an email by its user id token and verification token and then if the email is expired we return false
  else we check the difference between the date of confirmation and the date of sending the email
  if this duration is bigger than 2 days we update the email and set its expiration field to true
  else we return true
  */
  async confirmEmail(user: User, token: string, verificationToken: string) {
    const userId: number = user.id;
    const email: Email = await this.emailRepository.createQueryBuilder("email")
      .where("email.sender.id = :userId and email.token = :token and email.verificationToken = :verificationToken",
        {userId, token, verificationToken}
      ).getOne();
    
    const {isExpired, sentDate} = email;

    if(email) {
      
      if(isExpired) {
        return false;
      } else {
        const emailSendingDate: Date = sentDate;
        const confirmationDate: Date = new Date(); 

        const duration: number = DatesOperations.getDayDuration(emailSendingDate, confirmationDate);
        if(duration > 2) {
          const expiredEmail = email.setExpired(true);
          await this.emailRepository.save(expiredEmail);
          return false;
        }else {
          return true;
        }
        
      }
    }

    return false;

  }
}
