import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresenceEmployeeService } from './presence-employee.service';
import { CreatePresenceEmployeeDto } from './dto/create-presence-employee.dto';
import { UpdatePresenceEmployeeDto } from './dto/update-presence-employee.dto';

@Controller('presence-employee')
export class PresenceEmployeeController {
  constructor(private readonly presenceEmployeeService: PresenceEmployeeService) {}

  @Post()
  create(@Body() createPresenceEmployeeDto: CreatePresenceEmployeeDto) {
    return this.presenceEmployeeService.create(createPresenceEmployeeDto);
  }

  @Get()
  findAll() {
    return this.presenceEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presenceEmployeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresenceEmployeeDto: UpdatePresenceEmployeeDto) {
    return this.presenceEmployeeService.update(+id, updatePresenceEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presenceEmployeeService.remove(+id);
  }
}
