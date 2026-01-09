import { Test, TestingModule } from '@nestjs/testing';
import { ERaportService } from './e-raport.service';

describe('ERaportService', () => {
  let service: ERaportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ERaportService],
    }).compile();

    service = module.get<ERaportService>(ERaportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
