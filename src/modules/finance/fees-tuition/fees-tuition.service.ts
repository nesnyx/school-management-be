import { Injectable } from '@nestjs/common';
import { CreateFeesTuitionDto } from './dto/create-fees-tuition.dto';
import { UpdateFeesTuitionDto } from './dto/update-fees-tuition.dto';

@Injectable()
export class FeesTuitionService {
  create(createFeesTuitionDto: CreateFeesTuitionDto) {
    return 'This action adds a new feesTuition';
  }

  findAll() {
    return `This action returns all feesTuition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feesTuition`;
  }

  update(id: number, updateFeesTuitionDto: UpdateFeesTuitionDto) {
    return `This action updates a #${id} feesTuition`;
  }

  remove(id: number) {
    return `This action removes a #${id} feesTuition`;
  }
}
