import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeesTuitionService } from './fees-tuition.service';
import { CreateFeesTuitionDto } from './dto/create-fees-tuition.dto';
import { UpdateFeesTuitionDto } from './dto/update-fees-tuition.dto';

@Controller('fees-tuition')
export class FeesTuitionController {
  constructor(private readonly feesTuitionService: FeesTuitionService) {}

  @Post()
  create(@Body() createFeesTuitionDto: CreateFeesTuitionDto) {
    return this.feesTuitionService.create(createFeesTuitionDto);
  }

  @Get()
  findAll() {
    return this.feesTuitionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feesTuitionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeesTuitionDto: UpdateFeesTuitionDto) {
    return this.feesTuitionService.update(+id, updateFeesTuitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feesTuitionService.remove(+id);
  }
}
