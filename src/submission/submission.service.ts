import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Repository } from 'typeorm';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { UpdateSubmissionInput } from './dto/update-submission.input';
import { Submission } from './entities/submission.entity';
import { User } from '../user/entities/user.entity';
import { CARPOOL_DOES_NO_LONGER_EXIST_ERROR_MESSAGE, CARPOOL_NOT_FOUND_ERROR_MESSAGE, CASL_RESSOURCE_FORBIDDEN_ERROR_MESSAGE, SUBMISSION_NOT_FOUND_ERROR_MESSAGE, UNAUTHORIZED_SUBMISSION_ERROR_MESSAGE } from '../utils/constants';
import { Action } from '../casl/enums/action.enum';
import { CarpoolService } from '../carpool/carpool.service';
import { UserService } from '../user/user.service';
import { checkCASLAndExecute } from '../utils/casl-authority-check';
import { Status } from './entities/status.enum';
import { DatesOperations } from '../utils/dates-operation';
import { Carpool } from '../carpool/entities/carpool.entity';

@Injectable()
export class SubmissionService {
  constructor(@InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
  private readonly carpoolService: CarpoolService,
  private readonly userService: UserService,
  private caslAbilityFactory: CaslAbilityFactory<Submission>
  ){}

  async create(owner:User, createSubmissionInput: CreateSubmissionInput) {
    const carpoolId: number = createSubmissionInput.carpoolId;
    const carpool = await this.carpoolService.findOne(carpoolId);

    if(carpool) {
      if(await this.verifyConditionsForSubmitting(owner, carpool)) {
        const createdSubmission: Submission = await this.submissionRepository.create();
      
        // assign the properties
        this.submissionRepository.merge(createdSubmission, {owner}, {carpool});

        return await this.submissionRepository.save(createdSubmission);
      } else {
        throw new BadRequestException();
      }
    
    }else{
      throw new NotFoundException(CARPOOL_NOT_FOUND_ERROR_MESSAGE);
    }
  }

  async getSubmissionByCarpoolId(carpoolId: number): Promise<Submission[]> {
    return await this.submissionRepository.createQueryBuilder("submission")
    .where("submission.carpoolId = :carpoolId",{carpoolId})
    .leftJoinAndSelect("submission.carpool","carpool")
    .leftJoinAndSelect("submission.owner","user")
    .getMany();
  }

  /* 
    Conditions:
    1- A user cannot submit to a carpool twice.
    2- A user cannot submit to a carpool which its departure date is less then now date.
  */
  async verifyConditionsForSubmitting(owner: User, carpool: Carpool) {
    // duration =  departureDate - now
      // if duration < 0: it means that now < departureDate: So the carpool does no longer exist
      const duration = DatesOperations.getDayDuration(new Date(), carpool.departureDate);
      if(duration < 0) {
        return false;
      } else {
        if(owner.id === carpool.owner.id) {
          return false;
        } else {
          const submissionByCarpoolId = await this.getSubmissionByCarpoolId(carpool.id);
          const submissionOwnersIdOfCarpool: number[] = submissionByCarpoolId?.map((submission) => {

            // if a submission of a user is rejected, he has the right to re-submit
            if(submission.status !== Status.REJECTED) {
              return submission.owner.id;
            }
          });
          if(submissionOwnersIdOfCarpool?.indexOf(owner.id) > -1) {
            return false;
          }
        }
      }
      return true;
  }

  async findAll(): Promise<Submission[]> {
    return await this.submissionRepository.find();
  }

  async findOne(id: number) {
    return this.submissionRepository.findOne({where:{id}});
  }


  async rejectSubmission(user:User, submissionId: number, updateSubmissionInput: UpdateSubmissionInput): Promise<Submission> {
    const submission = await this.findOne(submissionId);

    // owner cannot reject a submission which was already rejected or accepted
    if(submission && submission.status === Status.PENDING) {
      const {carpool} = submission;
      // only the owner of the carpool could reject a submission
      if(carpool.owner.id === user.id ) {
        const submission = await this.findOne(submissionId);
        // change the status
        submission.status = Status.REJECTED;

        const {id, ...data} = submission;
        await this.submissionRepository.update(submissionId,data).then(updatedSubmission => updatedSubmission.raw[0]); 
        return this.findOne(submissionId);
      }else{
        throw new UnauthorizedException();
      }
    } else{
      throw new BadRequestException();
    }
  }

  async acceptSubmission(user:User, submissionId: number, updateSubmissionInput: UpdateSubmissionInput): Promise<Submission>{
    const submission = await this.findOne(submissionId);
    const {carpool} = submission;
    if(submission && submission.status === Status.PENDING) {
      // only the owner of the carpool could reject a submission
      if(carpool.owner.id === user.id ) {
        if(carpool.nbrOfAvailablePlaces > 0) {
          const submission = await this.findOne(submissionId);
          // change the status
          submission.status = Status.ACCEPTED;
          const {id, ...data} = submission;
          // update the submission
          await this.submissionRepository.update(submissionId,data).then(updatedSubmission => updatedSubmission.raw[0]); 

          // update the carpool
          carpool.nbrOfAvailablePlaces--;
          await this.carpoolService.updateCarpool(carpool);
          return this.findOne(submissionId);
        } else {
          throw new BadRequestException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new BadRequestException();
    }
  }



  async remove(user: User,id: number): Promise<Submission> {

    const executedFunction = checkCASLAndExecute<Submission>(
      user, 
      this.caslAbilityFactory,
      Action.Delete, 
      id, 
      this.submissionRepository,
      async () => {
          const submissionToRemove = await this.findOne(id);
          // if the submission is already accepted and we want to delete it we should update
          // carpool and increment the number of available places
          if(submissionToRemove.status === Status.ACCEPTED) {
            const carpoolId = submissionToRemove.carpool.id;
            const carpool = await this.carpoolService.findOne(carpoolId);

            carpool.nbrOfAvailablePlaces++;
            await this.carpoolService.updateCarpool(carpool);
          }
          await this.submissionRepository.softDelete(id);
          return submissionToRemove;
        }
      );
    return executedFunction;
  }
}
