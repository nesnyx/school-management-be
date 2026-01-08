import { Injectable } from '@nestjs/common';
import { CreatePresenceLessonDto } from './dto/create-presence-lesson.dto';
import { UpdatePresenceLessonDto } from './dto/update-presence-lesson.dto';

@Injectable()
export class PresenceLessonService {
  create(createPresenceLessonDto: CreatePresenceLessonDto) {
    return 'This action adds a new presenceLesson';
  }

  findAll() {
    return `This action returns all presenceLesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presenceLesson`;
  }

  update(id: number, updatePresenceLessonDto: UpdatePresenceLessonDto) {
    return `This action updates a #${id} presenceLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} presenceLesson`;
  }
}
