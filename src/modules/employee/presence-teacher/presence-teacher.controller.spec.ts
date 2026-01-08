import { Test, TestingModule } from '@nestjs/testing';
import { PresenceTeacherController } from './presence-teacher.controller';
import { PresenceTeacherService } from './presence-teacher.service';

describe('PresenceTeacherController', () => {
  let controller: PresenceTeacherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresenceTeacherController],
      providers: [PresenceTeacherService],
    }).compile();

    controller = module.get<PresenceTeacherController>(PresenceTeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
