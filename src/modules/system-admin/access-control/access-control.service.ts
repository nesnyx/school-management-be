import { Injectable } from '@nestjs/common';
import { CreateAccessControlDto, CreateRoleDto } from './dto/create-access-control.dto';
import { UpdateAccessControlDto } from './dto/update-access-control.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';


@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {

  }
  async createRole(createRoleDto: CreateRoleDto) {
    const newRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(newRole);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: string) {
    return await this.rolesRepository.findOne({ where: { id } });
  }

  async findOneByName(role: string) {
    return await this.rolesRepository.findOne({
      where: {
        name: role
      },
      select: ['id']
    })
  }

  async findOneByUserId(userId: string) {
    return await this.userRoleRepository.findOne({
      where: {
        userId: userId
      },
    })
  }

  async update(id: string, updateAccessControlDto: UpdateAccessControlDto) {
    return await this.rolesRepository.update(id, updateAccessControlDto);
  }

  async remove(id: string) {
    return await this.rolesRepository.delete(id);
  }


  async assignRole(userId: string, roleId: string, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(UserRole) : this.userRoleRepository
    const newUserRole = repo.create({
      roleId,
      userId
    })
    return await repo.save(newUserRole)
  }
} 
