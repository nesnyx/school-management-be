import { Injectable } from '@nestjs/common';
import { CreatePresenceEmployeeDto } from './dto/create-presence-employee.dto';
import { UpdatePresenceEmployeeDto } from './dto/update-presence-employee.dto';

@Injectable()
export class PresenceEmployeeService {
  create(createPresenceEmployeeDto: CreatePresenceEmployeeDto) {
    return 'This action adds a new presenceEmployee';
  }

  findAll() {
    return `This action returns all presenceEmployee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presenceEmployee`;
  }

  update(id: number, updatePresenceEmployeeDto: UpdatePresenceEmployeeDto) {
    return `This action updates a #${id} presenceEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} presenceEmployee`;
  }
}
