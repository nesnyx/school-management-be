import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from 'src/modules/system-admin/users/users.service';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';
import { AccessControlService } from 'src/modules/system-admin/access-control/access-control.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    private readonly userService: UsersService,
    private dataSource: DataSource,
    private readonly accessControlService: AccessControlService
  ) { }
  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }
  async create(createTeacherDto: CreateTeacherDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const generatedPassword = this.generatePassword();
    try {
      const user = await this.userService.create({
        identifier: createTeacherDto.nip,
        password: generatedPassword,

      }, queryRunner.manager);
      const newTeacher = this.teacherRepository.create({
        nip: createTeacherDto.nip,
        fullName: createTeacherDto.fullName,
        userId: user.id
      });
      const role = await this.accessControlService.findOneByName(Role.TEACHER)
      if (!role) {
        throw new NotFoundException("Role doesnt exist")
      }
      await Promise.all([
        queryRunner.manager.save(newTeacher),
        this.accessControlService.assignRole(user.id, role.id, queryRunner.manager),
        queryRunner.commitTransaction()
      ])
      return newTeacher
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release()
    }
  }

  async findAll() {
    return await this.teacherRepository.find();
  }

  async findOne(id: string) {
    return await this.teacherRepository.findOne({ where: { id } });
  }

  async findOneByUserId(id: string) {
    return await this.teacherRepository.findOne({ where: { userId: id } });
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const existingTeacher = await this.teacherRepository.findOne({ where: { id } });
    if (!existingTeacher) {
      throw new NotFoundException('Teacher not found');
    }
    const updated = this.teacherRepository.merge(existingTeacher, updateTeacherDto)
    return await this.teacherRepository.save(updated);
  }

  async remove(id: string) {
    const existingTeacher = await this.teacherRepository.findOne({ where: { id } });
    if (!existingTeacher) {
      throw new NotFoundException('Teacher not found');
    }
    return await this.teacherRepository.remove(existingTeacher);
  }
}
