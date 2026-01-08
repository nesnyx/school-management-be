import { Test, TestingModule } from '@nestjs/testing';
import { PresenceEmployeeService } from './presence-employee.service';

describe('PresenceEmployeeService', () => {
  let service: PresenceEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresenceEmployeeService],
    }).compile();

    service = module.get<PresenceEmployeeService>(PresenceEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
