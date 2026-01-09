import { Test, TestingModule } from '@nestjs/testing';
import { AdministrationLessonController } from './administration-lesson.controller';
import { AdministrationLessonService } from './administration-lesson.service';

describe('AdministrationLessonController', () => {
  let controller: AdministrationLessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrationLessonController],
      providers: [AdministrationLessonService],
    }).compile();

    controller = module.get<AdministrationLessonController>(AdministrationLessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
