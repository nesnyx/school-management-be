import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrationLessonService } from './administration-lesson.service';
import { CreateAdministrationLessonDto } from './dto/create-administration-lesson.dto';
import { UpdateAdministrationLessonDto } from './dto/update-administration-lesson.dto';

@Controller('administration-lesson')
export class AdministrationLessonController {
  constructor(private readonly administrationLessonService: AdministrationLessonService) {}

  @Post()
  create(@Body() createAdministrationLessonDto: CreateAdministrationLessonDto) {
    return this.administrationLessonService.create(createAdministrationLessonDto);
  }

  @Get()
  findAll() {
    return this.administrationLessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrationLessonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrationLessonDto: UpdateAdministrationLessonDto) {
    return this.administrationLessonService.update(+id, updateAdministrationLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrationLessonService.remove(+id);
  }
}
