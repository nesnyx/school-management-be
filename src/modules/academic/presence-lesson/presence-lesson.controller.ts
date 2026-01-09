import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresenceLessonService } from './presence-lesson.service';
import { CreatePresenceLessonDto } from './dto/create-presence-lesson.dto';
import { UpdatePresenceLessonDto } from './dto/update-presence-lesson.dto';

@Controller('presence-lesson')
export class PresenceLessonController {
  constructor(private readonly presenceLessonService: PresenceLessonService) { }

  @Post()
  create(@Body() createPresenceLessonDto: CreatePresenceLessonDto) {
    return this.presenceLessonService.create(createPresenceLessonDto);
  }

  @Get()
  findAll() {
    return this.presenceLessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presenceLessonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresenceLessonDto: UpdatePresenceLessonDto) {
    return this.presenceLessonService.update(+id, updatePresenceLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presenceLessonService.remove(+id);
  }
}
