import { Injectable } from '@nestjs/common';
import { CreatePunishmentDto } from './dto/create-punishment.dto';
import { UpdatePunishmentDto } from './dto/update-punishment.dto';

@Injectable()
export class PunishmentService {
  create(createPunishmentDto: CreatePunishmentDto) {
    return 'This action adds a new punishment';
  }

  findAll() {
    return `This action returns all punishment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} punishment`;
  }

  update(id: number, updatePunishmentDto: UpdatePunishmentDto) {
    return `This action updates a #${id} punishment`;
  }

  remove(id: number) {
    return `This action removes a #${id} punishment`;
  }
}
