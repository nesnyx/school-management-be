import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ERaportService } from './e-raport.service';
import { CreateERaportDto } from './dto/create-e-raport.dto';
import { UpdateERaportDto } from './dto/update-e-raport.dto';

@Controller('e-raport')
export class ERaportController {
  constructor(private readonly eRaportService: ERaportService) {}

  @Post()
  create(@Body() createERaportDto: CreateERaportDto) {
    return this.eRaportService.create(createERaportDto);
  }

  @Get()
  findAll() {
    return this.eRaportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eRaportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateERaportDto: UpdateERaportDto) {
    return this.eRaportService.update(+id, updateERaportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eRaportService.remove(+id);
  }
}
