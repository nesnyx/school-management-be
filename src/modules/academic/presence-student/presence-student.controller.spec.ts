import { Test, TestingModule } from '@nestjs/testing';
import { PresenceStudentController } from './presence-student.controller';
import { PresenceStudentService } from './presence-student.service';

describe('PresenceStudentController', () => {
  let controller: PresenceStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresenceStudentController],
      providers: [PresenceStudentService],
    }).compile();

    controller = module.get<PresenceStudentController>(PresenceStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
