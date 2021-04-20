import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import {SubmissionService} from './submission.service';
import {Submission} from './entities/submission.entity';
import {CreateSubmissionInput} from './dto/create-submission.input';
import {UpdateSubmissionInput} from './dto/update-submission.input';
import {Auth} from '../shared/decorators/auth.decorator';
import {UserRoleEnum} from '../user/entities/user-role.enum';
import {CurrentUser} from '../shared/decorators/current-user.decorator';
import {User} from '../user/entities/user.entity';
import {PubSub} from 'graphql-subscriptions';
import {Notification} from '../notification/entities/notification.entity';
@Resolver(() => Submission)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Mutation(() => Submission)
  @Auth(UserRoleEnum.USER)
  createSubmission(
    @CurrentUser() owner: User,
    @Args('createSubmissionInput') createSubmissionInput: CreateSubmissionInput,
  ): Promise<Submission> {
    return this.submissionService.create(owner, createSubmissionInput);
  }

  @Query(() => [Submission])
  findAllSubmissions() {
    return this.submissionService.findAll();
  }

  @Query(() => Submission)
  findOneSubmission(@Args('id', {type: () => Int}) id: number) {
    return this.submissionService.findOne(id);
  }

  @Mutation(() => Submission)
  @Auth(UserRoleEnum.USER)
  rejectSubmission(
    @CurrentUser() user: User,
    @Args('updateSubmissionInput') updateSubmissionInput: UpdateSubmissionInput,
  ) {
    return this.submissionService.rejectSubmission(
      user,
      updateSubmissionInput.id,
      updateSubmissionInput,
    );
  }

  @Mutation(() => Submission)
  @Auth(UserRoleEnum.USER)
  acceptSubmission(
    @CurrentUser() user: User,
    @Args('updateSubmissionInput') updateSubmissionInput: UpdateSubmissionInput,
  ) {
    return this.submissionService.acceptSubmission(
      user,
      updateSubmissionInput.id,
      updateSubmissionInput,
    );
  }

  @Mutation(() => Submission)
  @Auth(UserRoleEnum.USER)
  removeSubmission(
    @CurrentUser() user: User,
    @Args('id', {type: () => Int}) id: number,
  ) {
    return this.submissionService.remove(user, id);
  }
}
