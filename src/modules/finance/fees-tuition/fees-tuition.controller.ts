import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeesTuitionService } from './fees-tuition.service';
import { CreateFeesTuitionDto } from './dto/create-fees-tuition.dto';


@Controller('fees-tuition')
export class FeesTuitionController {
  constructor(private readonly feesTuitionService: FeesTuitionService) { }


  @Get()
  async getAll() {
    return await this.feesTuitionService.findAll()
  }

  @Get(':id')
  async getStatus(@Param('id') id: string) {
    return await this.feesTuitionService.findOne(id);
  }


  @Post('checkout')
  async checkout(@Body() createFeesTuitionDto: CreateFeesTuitionDto) {
    return await this.feesTuitionService.create(createFeesTuitionDto);
  }


}
