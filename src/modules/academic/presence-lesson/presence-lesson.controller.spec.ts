import { Test, TestingModule } from '@nestjs/testing';
import { PresenceLessonController } from './presence-lesson.controller';
import { PresenceLessonService } from './presence-lesson.service';

describe('PresenceLessonController', () => {
  let controller: PresenceLessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresenceLessonController],
      providers: [PresenceLessonService],
    }).compile();

    controller = module.get<PresenceLessonController>(PresenceLessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
