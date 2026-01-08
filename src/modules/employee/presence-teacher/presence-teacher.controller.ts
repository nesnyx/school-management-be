import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresenceTeacherService } from './presence-teacher.service';
import { CreatePresenceTeacherDto } from './dto/create-presence-teacher.dto';
import { UpdatePresenceTeacherDto } from './dto/update-presence-teacher.dto';

@Controller('presence-teacher')
export class PresenceTeacherController {
  constructor(private readonly presenceTeacherService: PresenceTeacherService) {}

  @Post()
  create(@Body() createPresenceTeacherDto: CreatePresenceTeacherDto) {
    return this.presenceTeacherService.create(createPresenceTeacherDto);
  }

  @Get()
  findAll() {
    return this.presenceTeacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presenceTeacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresenceTeacherDto: UpdatePresenceTeacherDto) {
    return this.presenceTeacherService.update(+id, updatePresenceTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presenceTeacherService.remove(+id);
  }
}
