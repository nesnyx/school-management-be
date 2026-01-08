import { Module } from '@nestjs/common';
import { AdministrationLessonService } from './administration-lesson.service';
import { AdministrationLessonController } from './administration-lesson.controller';

@Module({
  controllers: [AdministrationLessonController],
  providers: [AdministrationLessonService],
})
export class AdministrationLessonModule {}
