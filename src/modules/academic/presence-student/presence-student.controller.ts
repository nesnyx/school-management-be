import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresenceStudentService } from './presence-student.service';
import { CreatePresenceStudentDto } from './dto/create-presence-student.dto';


@Controller('presence-student')
export class PresenceStudentController {
  constructor(private readonly presenceStudentService: PresenceStudentService) { }

  @Post('record')
  async recordPresence(@Body() createPresenceStudentDto: CreatePresenceStudentDto) {
    return await this.presenceStudentService.recordPresence(createPresenceStudentDto);
  }

  @Get()
  async findAll() {
    return await this.presenceStudentService.findAll();
  }
}
