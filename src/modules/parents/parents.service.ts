import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../system-admin/users/users.service';
import { Role } from '../system-admin/users/entities/user.entity';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
    private userService: UsersService
  ) { }
  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }
  async create(createParentDto: CreateParentDto) {
    const user = await this.userService.create({
      identifier: createParentDto.telp,
      password: this.generatePassword(),
      role: Role.ORANG_TUA
    })
    const newParent = this.parentRepository.create({
      telp: createParentDto.telp,
      fullName: createParentDto.fullName,
      userId: user.id
    })
    return await this.parentRepository.save(newParent);
  }

  async findAll() {
    return await this.parentRepository.find();
  }

  async findOne(id: number) {
    return await this.parentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateParentDto: UpdateParentDto) {
    const existingParent = await this.parentRepository.findOne({ where: { id } });
    if (!existingParent) {
      throw new NotFoundException('Parent not found');
    }
    const updated = this.parentRepository.merge(existingParent, updateParentDto)
    return await this.parentRepository.save(updated);
  }

  async remove(id: number) {
    const existingParent = await this.parentRepository.findOne({ where: { id } });
    if (!existingParent) {
      throw new NotFoundException('Parent not found');
    }
    return await this.parentRepository.remove(existingParent);
  }
}
