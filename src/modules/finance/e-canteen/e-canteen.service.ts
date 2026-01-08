import { Injectable } from '@nestjs/common';
import { CreateECanteenDto } from './dto/create-e-canteen.dto';
import { UpdateECanteenDto } from './dto/update-e-canteen.dto';

@Injectable()
export class ECanteenService {
  create(createECanteenDto: CreateECanteenDto) {
    return 'This action adds a new eCanteen';
  }

  findAll() {
    return `This action returns all eCanteen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eCanteen`;
  }

  update(id: number, updateECanteenDto: UpdateECanteenDto) {
    return `This action updates a #${id} eCanteen`;
  }

  remove(id: number) {
    return `This action removes a #${id} eCanteen`;
  }
}
