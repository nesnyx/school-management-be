import { Test, TestingModule } from '@nestjs/testing';
import { AdministrationEmployeeController } from './administration-employee.controller';
import { AdministrationEmployeeService } from './administration-employee.service';

describe('AdministrationEmployeeController', () => {
  let controller: AdministrationEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrationEmployeeController],
      providers: [AdministrationEmployeeService],
    }).compile();

    controller = module.get<AdministrationEmployeeController>(AdministrationEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
