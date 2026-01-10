import { Controller, Post, Body, Get } from '@nestjs/common';
import { PresenceTeacherService } from './presence-teacher.service';
import { CreatePresenceTeacherDto } from './dto/create-presence-teacher.dto';


@Controller('presence-teacher')
export class PresenceTeacherController {
  constructor(private readonly presenceTeacherService: PresenceTeacherService) { }

  @Post("record")
  async create(@Body() createPresenceTeacherDto: CreatePresenceTeacherDto) {
    return await this.presenceTeacherService.recordPresence(createPresenceTeacherDto);
  }

  @Get()
  async findAll() {
    return await this.presenceTeacherService.findAll();
  }



}
