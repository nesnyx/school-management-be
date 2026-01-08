import { Injectable } from '@nestjs/common';
import { CreateAdministrationEmployeeDto } from './dto/create-administration-employee.dto';
import { UpdateAdministrationEmployeeDto } from './dto/update-administration-employee.dto';

@Injectable()
export class AdministrationEmployeeService {
  create(createAdministrationEmployeeDto: CreateAdministrationEmployeeDto) {
    return 'This action adds a new administrationEmployee';
  }

  findAll() {
    return `This action returns all administrationEmployee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrationEmployee`;
  }

  update(id: number, updateAdministrationEmployeeDto: UpdateAdministrationEmployeeDto) {
    return `This action updates a #${id} administrationEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrationEmployee`;
  }
}
