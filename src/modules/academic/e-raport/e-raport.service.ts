import { Injectable } from '@nestjs/common';
import { CreateERaportDto } from './dto/create-e-raport.dto';
import { UpdateERaportDto } from './dto/update-e-raport.dto';

@Injectable()
export class ERaportService {
  create(createERaportDto: CreateERaportDto) {
    return 'This action adds a new eRaport';
  }

  findAll() {
    return `This action returns all eRaport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eRaport`;
  }

  update(id: number, updateERaportDto: UpdateERaportDto) {
    return `This action updates a #${id} eRaport`;
  }

  remove(id: number) {
    return `This action removes a #${id} eRaport`;
  }
}
