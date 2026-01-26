import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CbtService } from './cbt.service';
import { CreateCbtDto } from './dto/create-cbt.dto';


@Controller('cbt')
export class CbtController {
  constructor(private readonly cbtService: CbtService) {}

  @Post()
  create(@Body() createCbtDto: CreateCbtDto) {
    return this.cbtService.create(createCbtDto);
  }

  @Get()
  findAll() {
    return this.cbtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cbtService.findOne(+id);
  }
}
