import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { CreateRoleDto } from './dto/create-access-control.dto';
import { UpdateAccessControlDto } from './dto/update-access-control.dto';

@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) { }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.accessControlService.createRole(createRoleDto);
  }


  @Get()
  async findAll() {
    return await this.accessControlService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accessControlService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccessControlDto: UpdateAccessControlDto) {
    return await this.accessControlService.update(id, updateAccessControlDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.accessControlService.remove(id);
  }
}
