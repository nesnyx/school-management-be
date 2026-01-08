import { Test, TestingModule } from '@nestjs/testing';
import { PresenceTeacherService } from './presence-teacher.service';

describe('PresenceTeacherService', () => {
  let service: PresenceTeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresenceTeacherService],
    }).compile();

    service = module.get<PresenceTeacherService>(PresenceTeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
