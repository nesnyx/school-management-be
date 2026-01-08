import { Test, TestingModule } from '@nestjs/testing';
import { AdministrationEmployeeService } from './administration-employee.service';

describe('AdministrationEmployeeService', () => {
  let service: AdministrationEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministrationEmployeeService],
    }).compile();

    service = module.get<AdministrationEmployeeService>(AdministrationEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
