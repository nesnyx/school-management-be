import { Injectable } from '@nestjs/common';
import { CreatePresenceStudentDto } from './dto/create-presence-student.dto';
import { UpdatePresenceStudentDto } from './dto/update-presence-student.dto';

@Injectable()
export class PresenceStudentService {
  create(createPresenceStudentDto: CreatePresenceStudentDto) {
    return 'This action adds a new presenceStudent';
  }

  findAll() {
    return `This action returns all presenceStudent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presenceStudent`;
  }

  update(id: number, updatePresenceStudentDto: UpdatePresenceStudentDto) {
    return `This action updates a #${id} presenceStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} presenceStudent`;
  }
}
