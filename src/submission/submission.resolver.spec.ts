import {Test, TestingModule} from '@nestjs/testing';
import {User} from '../user/entities/user.entity';
import {CreateSubmissionInput} from './dto/create-submission.input';
import {UpdateSubmissionInput} from './dto/update-submission.input';
import {SubmissionResolver} from './submission.resolver';
import {SubmissionService} from './submission.service';

describe('SubmissionResolver', () => {
  let resolver: SubmissionResolver;
  const mockSubmissionService = {
    findAll: jest.fn().mockImplementation(() => []),
    create: jest.fn().mockImplementation((owner, dto) => {
      return {
        ...dto,
        id: 1,
      };
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return {
        id,
      };
    }),
    rejectSubmission: jest.fn().mockImplementation((user, dto) => {
      return {
        ...dto,
      };
    }),
    acceptSubmission: jest.fn().mockImplementation((user, dto) => {
      return {
        ...dto,
      };
    }),
    remove: jest.fn().mockImplementation((user, id) => {
      return {
        id,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionResolver, SubmissionService],
    })
      .overrideProvider(SubmissionService)
      .useValue(mockSubmissionService)
      .compile();

    resolver = module.get<SubmissionResolver>(SubmissionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all submissions', () => {
    expect(resolver.findAllSubmissions()).toBeDefined();
    expect(mockSubmissionService.findAll).toBeCalled();
  });

  it('should create a submission', () => {
    const owner: User = new User();
    const createSubmissionInput = {} as CreateSubmissionInput;
    expect(
      resolver.createSubmission(owner, createSubmissionInput),
    ).toBeDefined();
    expect(mockSubmissionService.create).toBeCalled();
  });
  it('should find a submission with a specific id', () => {
    const id: number = 1;
    expect(resolver.findOneSubmission(id)).toBeDefined();
    expect(mockSubmissionService.findOne).toBeCalled();
    expect(mockSubmissionService.findOne(id)).toMatchObject({id});
  });

  it('should reject a submission', () => {
    const user: User = new User();
    const updateSubmissionInput = {} as UpdateSubmissionInput;

    expect(
      resolver.rejectSubmission(user, updateSubmissionInput),
    ).toBeDefined();
    expect(mockSubmissionService.rejectSubmission).toBeCalled();
  });

  it('should accept a submission', () => {
    const user: User = new User();
    const updateSubmissionInput = {} as UpdateSubmissionInput;

    expect(
      resolver.acceptSubmission(user, updateSubmissionInput),
    ).toBeDefined();
    expect(mockSubmissionService.acceptSubmission).toBeCalled();
  });

  it('should remove a submission with a specific id', () => {
    const user = new User();
    const id: number = 1;
    expect(resolver.removeSubmission(user, id)).toMatchObject({id});
    expect(mockSubmissionService.remove).toBeCalled();
  });
});
