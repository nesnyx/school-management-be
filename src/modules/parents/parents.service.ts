import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from '../system-admin/users/users.service';
import { Role } from '../system-admin/users/entities/user.entity';
import { AccessControlService } from '../system-admin/access-control/access-control.service';
import { StudentsService } from '../academic/students/students.service';
import { StudentParent } from './entities/student-parent.entity';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
    private readonly userService: UsersService,
    private dataSource: DataSource,
    private readonly accessControlService: AccessControlService,
    private readonly studentService: StudentsService,
    @InjectRepository(StudentParent)
    private studentParentRepository: Repository<StudentParent>
  ) { }
  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }
  async create(createParentDto: CreateParentDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const generatedPassword = this.generatePassword();
    try {
      const user = await this.userService.create({
        identifier: createParentDto.telp,
        password: generatedPassword
      }, queryRunner.manager)
      const newParent = this.parentRepository.create({
        telp: createParentDto.telp,
        fullName: createParentDto.fullName,
        userId: user.id
      })
      const role = await this.accessControlService.findOneByName(Role.PARENT)
      if (!role) {
        throw new NotFoundException("Role doesnt exist")
      }
      await queryRunner.manager.save(newParent),
        await this.accessControlService.assignRole(user.id, role.id, queryRunner.manager),
        await queryRunner.commitTransaction()
      return newParent
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release()
    }
  }

  async findAll() {
    return await this.parentRepository.find();
  }

  async findOne(id: string) {
    return await this.parentRepository.findOne({ where: { id } });
  }

  async update(id: string, updateParentDto: UpdateParentDto) {
    const existingParent = await this.parentRepository.findOne({ where: { id } });
    if (!existingParent) {
      throw new NotFoundException('Parent not found');
    }
    const updated = this.parentRepository.merge(existingParent, updateParentDto)
    return await this.parentRepository.save(updated);
  }

  async remove(id: string) {
    const existingParent = await this.parentRepository.findOne({ where: { id } });
    if (!existingParent) {
      throw new NotFoundException('Parent not found');
    }
    return await this.parentRepository.remove(existingParent);
  }
  
  async assignParent(userId: string, parentId: string) {
    const [existingParent, existingUser] = await Promise.all([
      this.parentRepository.findOne({
        where: {
          id: parentId
        }
      }),
      this.userService.findOne(userId)
    ])
    if (!existingUser) throw new NotFoundException("User Not Found")
    if (!existingParent) throw new NotFoundException("Parent not Found")
    const checkStudent = await this.studentService.findOneByUserId(existingUser.id)
    if (!checkStudent) throw new BadRequestException(`This User ID ${userId} is not student`)
    const assign = this.studentParentRepository.create({
      userId: userId,
      parentId: parentId
    })
    return await this.studentParentRepository.save(assign)

  }

}
