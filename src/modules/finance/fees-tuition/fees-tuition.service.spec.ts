import { Test, TestingModule } from '@nestjs/testing';
import { FeesTuitionService } from './fees-tuition.service';

describe('FeesTuitionService', () => {
  let service: FeesTuitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeesTuitionService],
    }).compile();

    service = module.get<FeesTuitionService>(FeesTuitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
