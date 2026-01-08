import { Test, TestingModule } from '@nestjs/testing';
import { ECanteenService } from './e-canteen.service';

describe('ECanteenService', () => {
  let service: ECanteenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ECanteenService],
    }).compile();

    service = module.get<ECanteenService>(ECanteenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
