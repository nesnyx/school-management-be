import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-cbt.dto';



@Injectable()
export class CbtService {
  constructor() {}
  async createExam(createExam : CreateExamDto) {
    return 'This action adds a new cbt';
  }

  async findAll() {
    return `This action returns all cbt`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} cbt`;
  }


}
