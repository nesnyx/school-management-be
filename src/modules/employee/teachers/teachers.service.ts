import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/modules/system-admin/users/users.service';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    private readonly userService: UsersService
  ) { }
  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }
  async create(createTeacherDto: CreateTeacherDto) {
    const generatedPassword = this.generatePassword();
    const user = await this.userService.create({
      identifier: createTeacherDto.nip,
      password: generatedPassword,
      role: Role.GURU,
    });
    const newTeacher = this.teacherRepository.create({
      nip: createTeacherDto.nip,
      fullName: createTeacherDto.fullName,
      userId: user.id
    });
    return await this.teacherRepository.save(newTeacher);
  }

  async findAll() {
    return await this.teacherRepository.find();
  }

  async findOne(id: number) {
    return await this.teacherRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const existingTeacher = await this.teacherRepository.findOne({ where: { id } });
    if (!existingTeacher) {
      throw new NotFoundException('Teacher not found');
    }
    const updated = this.teacherRepository.merge(existingTeacher, updateTeacherDto)
    return await this.teacherRepository.save(updated);
  }

  async remove(id: number) {
    const existingTeacher = await this.teacherRepository.findOne({ where: { id } });
    if (!existingTeacher) {
      throw new NotFoundException('Teacher not found');
    }
    return await this.teacherRepository.remove(existingTeacher);
  }
}
