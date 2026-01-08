import { Injectable } from '@nestjs/common';
import { CreatePresenceTeacherDto } from './dto/create-presence-teacher.dto';
import { UpdatePresenceTeacherDto } from './dto/update-presence-teacher.dto';

@Injectable()
export class PresenceTeacherService {
  create(createPresenceTeacherDto: CreatePresenceTeacherDto) {
    return 'This action adds a new presenceTeacher';
  }

  findAll() {
    return `This action returns all presenceTeacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presenceTeacher`;
  }

  update(id: number, updatePresenceTeacherDto: UpdatePresenceTeacherDto) {
    return `This action updates a #${id} presenceTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} presenceTeacher`;
  }
}
