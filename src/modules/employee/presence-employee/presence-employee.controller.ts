import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresenceEmployeeService } from './presence-employee.service';
import { CreatePresenceEmployeeDto } from './dto/create-presence-employee.dto';


@Controller('presence-employee')
export class PresenceEmployeeController {
  constructor(private readonly presenceEmployeeService: PresenceEmployeeService) { }

  @Post("record")
  async create(@Body() createPresenceEmployeeDto: CreatePresenceEmployeeDto) {
    return await this.presenceEmployeeService.recordPresence(createPresenceEmployeeDto);
  }

  @Get()
  async findAll() {
    return await this.presenceEmployeeService.findAll();
  }

}
