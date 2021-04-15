import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';

describe('SubmissionResolver', () => {
  let resolver: SubmissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionResolver, SubmissionService],
    }).compile();

    resolver = module.get<SubmissionResolver>(SubmissionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
