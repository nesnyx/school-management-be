import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { AssignParentDto } from './dto/assign-parent.dto';

@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) { }

  @Post()
  async create(@Body() createParentDto: CreateParentDto) {
    return await this.parentsService.create(createParentDto);
  }

  @Get()
  async findAll() {
    return await this.parentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.parentsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return await this.parentsService.update(id, updateParentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.parentsService.remove(id);
  }

  @Post("assign")
  async assign(@Body() assignParentDto : AssignParentDto) {
    return await this.parentsService.assignParent(assignParentDto.userId,assignParentDto.parentId)
  }
}
