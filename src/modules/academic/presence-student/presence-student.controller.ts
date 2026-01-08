import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresenceStudentService } from './presence-student.service';
import { CreatePresenceStudentDto } from './dto/create-presence-student.dto';
import { UpdatePresenceStudentDto } from './dto/update-presence-student.dto';

@Controller('presence-student')
export class PresenceStudentController {
  constructor(private readonly presenceStudentService: PresenceStudentService) {}

  @Post()
  create(@Body() createPresenceStudentDto: CreatePresenceStudentDto) {
    return this.presenceStudentService.create(createPresenceStudentDto);
  }

  @Get()
  findAll() {
    return this.presenceStudentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presenceStudentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresenceStudentDto: UpdatePresenceStudentDto) {
    return this.presenceStudentService.update(+id, updatePresenceStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presenceStudentService.remove(+id);
  }
}
