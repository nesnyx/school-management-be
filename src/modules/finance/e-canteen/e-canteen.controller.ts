import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ECanteenService } from './e-canteen.service';
import { CreateECanteenDto } from './dto/create-e-canteen.dto';
import { UpdateECanteenDto } from './dto/update-e-canteen.dto';

@Controller('e-canteen')
export class ECanteenController {
  constructor(private readonly eCanteenService: ECanteenService) {}

  @Post()
  create(@Body() createECanteenDto: CreateECanteenDto) {
    return this.eCanteenService.create(createECanteenDto);
  }

  @Get()
  findAll() {
    return this.eCanteenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eCanteenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateECanteenDto: UpdateECanteenDto) {
    return this.eCanteenService.update(+id, updateECanteenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eCanteenService.remove(+id);
  }
}
