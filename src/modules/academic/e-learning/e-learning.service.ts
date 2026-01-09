import { Injectable } from '@nestjs/common';
import { CreateELearningDto } from './dto/create-e-learning.dto';
import { UpdateELearningDto } from './dto/update-e-learning.dto';

@Injectable()
export class ELearningService {
  create(createELearningDto: CreateELearningDto) {
    return 'This action adds a new eLearning';
  }

  findAll() {
    return `This action returns all eLearning`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eLearning`;
  }

  update(id: number, updateELearningDto: UpdateELearningDto) {
    return `This action updates a #${id} eLearning`;
  }

  remove(id: number) {
    return `This action removes a #${id} eLearning`;
  }
}
