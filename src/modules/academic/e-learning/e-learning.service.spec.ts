import { Test, TestingModule } from '@nestjs/testing';
import { ELearningService } from './e-learning.service';

describe('ELearningService', () => {
  let service: ELearningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ELearningService],
    }).compile();

    service = module.get<ELearningService>(ELearningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
