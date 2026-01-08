import { Test, TestingModule } from '@nestjs/testing';
import { FeesTuitionController } from './fees-tuition.controller';
import { FeesTuitionService } from './fees-tuition.service';

describe('FeesTuitionController', () => {
  let controller: FeesTuitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeesTuitionController],
      providers: [FeesTuitionService],
    }).compile();

    controller = module.get<FeesTuitionController>(FeesTuitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
