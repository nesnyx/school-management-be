import { Test, TestingModule } from '@nestjs/testing';
import { PresenceLessonService } from './presence-lesson.service';

describe('PresenceLessonService', () => {
  let service: PresenceLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresenceLessonService],
    }).compile();

    service = module.get<PresenceLessonService>(PresenceLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
