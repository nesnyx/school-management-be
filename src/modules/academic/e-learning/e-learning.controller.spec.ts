import { Test, TestingModule } from '@nestjs/testing';
import { ELearningController } from './e-learning.controller';
import { ELearningService } from './e-learning.service';

describe('ELearningController', () => {
  let controller: ELearningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ELearningController],
      providers: [ELearningService],
    }).compile();

    controller = module.get<ELearningController>(ELearningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
