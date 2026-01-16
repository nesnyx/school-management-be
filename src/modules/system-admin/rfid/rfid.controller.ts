import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { AssignRfidDto } from './dto/assign-rfid.dto';


@Controller('rfids')
export class RfidController {
  constructor(private readonly rfidService: RfidService) { }

  @Post()
  async create(@Body() createRfidDto: CreateRfidDto) {
    return await this.rfidService.create(createRfidDto);
  }

  @Post("assign")
  async assignRfid(@Body() assignRfidDto: AssignRfidDto) {
    return await this.rfidService.assignCardToUser(assignRfidDto);
  }

  @Get()
  async findAll() {
    return await this.rfidService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rfidService.findRfidById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() rfid: string) {
    return await this.rfidService.updateRfid(id, rfid);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rfidService.removeRfid(id);
  }
}
