import { Module } from '@nestjs/common';
import { PresenceLessonService } from './presence-lesson.service';
import { PresenceLessonController } from './presence-lesson.controller';

@Module({
  controllers: [PresenceLessonController],
  providers: [PresenceLessonService],
})
export class PresenceLessonModule {}
