import { Test, TestingModule } from '@nestjs/testing';
import { PresenceStudentService } from './presence-student.service';

describe('PresenceStudentService', () => {
  let service: PresenceStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresenceStudentService],
    }).compile();

    service = module.get<PresenceStudentService>(PresenceStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
