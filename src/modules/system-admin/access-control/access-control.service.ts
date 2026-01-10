import { Injectable } from '@nestjs/common';
import { CreateAccessControlDto, CreateRoleDto } from './dto/create-access-control.dto';
import { UpdateAccessControlDto } from './dto/update-access-control.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) {

  }
  async createRole(createRoleDto: CreateRoleDto) {
    const newRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(newRole);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    return await this.rolesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAccessControlDto: UpdateAccessControlDto) {
    return await this.rolesRepository.update(id, updateAccessControlDto);
  }

  async remove(id: number) {
    return await this.rolesRepository.delete(id);
  }
}
