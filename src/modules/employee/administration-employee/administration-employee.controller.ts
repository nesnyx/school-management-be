import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrationEmployeeService } from './administration-employee.service';
import { CreateAdministrationEmployeeDto } from './dto/create-administration-employee.dto';
import { UpdateAdministrationEmployeeDto } from './dto/update-administration-employee.dto';

@Controller('administration-employee')
export class AdministrationEmployeeController {
  constructor(private readonly administrationEmployeeService: AdministrationEmployeeService) {}

  @Post()
  create(@Body() createAdministrationEmployeeDto: CreateAdministrationEmployeeDto) {
    return this.administrationEmployeeService.create(createAdministrationEmployeeDto);
  }

  @Get()
  findAll() {
    return this.administrationEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrationEmployeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrationEmployeeDto: UpdateAdministrationEmployeeDto) {
    return this.administrationEmployeeService.update(+id, updateAdministrationEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrationEmployeeService.remove(+id);
  }
}
