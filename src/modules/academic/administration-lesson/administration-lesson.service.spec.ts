import { Test, TestingModule } from '@nestjs/testing';
import { AdministrationLessonService } from './administration-lesson.service';

describe('AdministrationLessonService', () => {
  let service: AdministrationLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministrationLessonService],
    }).compile();

    service = module.get<AdministrationLessonService>(AdministrationLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
