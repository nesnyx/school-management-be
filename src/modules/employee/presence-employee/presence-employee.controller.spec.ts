import { Test, TestingModule } from '@nestjs/testing';
import { PresenceEmployeeController } from './presence-employee.controller';
import { PresenceEmployeeService } from './presence-employee.service';

describe('PresenceEmployeeController', () => {
  let controller: PresenceEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresenceEmployeeController],
      providers: [PresenceEmployeeService],
    }).compile();

    controller = module.get<PresenceEmployeeController>(PresenceEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
