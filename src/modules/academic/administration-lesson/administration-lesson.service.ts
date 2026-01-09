import { Injectable } from '@nestjs/common';
import { CreateAdministrationLessonDto } from './dto/create-administration-lesson.dto';
import { UpdateAdministrationLessonDto } from './dto/update-administration-lesson.dto';

@Injectable()
export class AdministrationLessonService {
  create(createAdministrationLessonDto: CreateAdministrationLessonDto) {
    return 'This action adds a new administrationLesson';
  }

  findAll() {
    return `This action returns all administrationLesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrationLesson`;
  }

  update(id: number, updateAdministrationLessonDto: UpdateAdministrationLessonDto) {
    return `This action updates a #${id} administrationLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrationLesson`;
  }
}
