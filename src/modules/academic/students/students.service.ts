import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/modules/system-admin/users/users.service';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>, private userService: UsersService) { }
  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }
  async create(createStudentDto: CreateStudentDto) {
    const generatedPassword = this.generatePassword();
    const user = await this.userService.create({
      identifier: createStudentDto.nis,
      password: generatedPassword,
      role: Role.SISWA,
    });
    const student = this.studentRepository.create({
      nis: createStudentDto.nis,
      fullName: createStudentDto.fullName,
      userId: user.id,
    });
    return await this.studentRepository.save(student);

  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: number) {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.studentRepository.findOne({ where: { id } });
    if (!existingStudent) {
      throw new Error('Student not found');
    }
    const updated = this.studentRepository.merge(existingStudent, updateStudentDto)
    return await this.studentRepository.save(updated);
  }

  async remove(id: number) {
    const existingStudent = await this.studentRepository.findOne({ where: { id } });
    if (!existingStudent) {
      throw new Error('Student not found');
    }
    return await this.studentRepository.remove(existingStudent);
  }
}
