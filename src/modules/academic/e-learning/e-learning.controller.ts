import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ELearningService } from './e-learning.service';
import { CreateELearningDto } from './dto/create-e-learning.dto';
import { UpdateELearningDto } from './dto/update-e-learning.dto';

@Controller('e-learning')
export class ELearningController {
  constructor(private readonly eLearningService: ELearningService) {}

  @Post()
  create(@Body() createELearningDto: CreateELearningDto) {
    return this.eLearningService.create(createELearningDto);
  }

  @Get()
  findAll() {
    return this.eLearningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eLearningService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateELearningDto: UpdateELearningDto) {
    return this.eLearningService.update(+id, updateELearningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eLearningService.remove(+id);
  }
}
