import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from 'src/modules/system-admin/users/users.service';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';
import { AccessControlService } from 'src/modules/system-admin/access-control/access-control.service';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>, private userService: UsersService, private dataSource: DataSource, private readonly accessControlService: AccessControlService) { }

  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }
  async create(createStudentDto: CreateStudentDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const generatedPassword = this.generatePassword();
    try {
      const user = await this.userService.create({
        identifier: createStudentDto.nis,
        password: generatedPassword,
      }, queryRunner.manager);
      const student = queryRunner.manager.create(Student, {
        nis: createStudentDto.nis,
        fullName: createStudentDto.fullName,
        userId: user.id,
      });
      const role = await this.accessControlService.findOneByName(Role.STUDENT)
      if (!role) {
        throw new NotFoundException("Role doesnt exist")
      }
      await queryRunner.manager.save(student),
        await this.accessControlService.assignRole(user.id, role.id, queryRunner.manager),
        await queryRunner.commitTransaction()

      return student
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release()
    }

  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: string) {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async findOneByUserId(id: string) {
    return await this.studentRepository.findOne({ where: { userId: id } });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.studentRepository.findOne({ where: { id } });
    if (!existingStudent) {
      throw new Error('Student not found');
    }
    const updated = this.studentRepository.merge(existingStudent, updateStudentDto)
    return await this.studentRepository.save(updated);
  }

  async remove(id: string) {
    const existingStudent = await this.studentRepository.findOne({ where: { id } });
    if (!existingStudent) {
      throw new Error('Student not found');
    }
    return await this.studentRepository.remove(existingStudent);
  }
}
