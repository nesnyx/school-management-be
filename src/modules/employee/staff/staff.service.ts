import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from 'src/modules/system-admin/users/users.service';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';
import { AccessControlService } from 'src/modules/system-admin/access-control/access-control.service';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private userService: UsersService,
    private dataSource: DataSource,
    private readonly accessControlService: AccessControlService
  ) { }

  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }

  async create(createStaffDto: CreateStaffDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const generatedPassword = this.generatePassword();
    try {
      const user = await this.userService.create({
        identifier: createStaffDto.username,
        password: generatedPassword,
      }, queryRunner.manager);
      const staff = this.staffRepository.create({
        username: createStaffDto.username,
        fullName: createStaffDto.fullName,
        userId: user.id
      })
      const role = await this.accessControlService.findOneByName(Role.STAFF)
      if (!role) {
        throw new NotFoundException("Role doesnt exist")
      }
      await Promise.all([
        queryRunner.manager.save(staff),
        this.accessControlService.assignRole(user.id, role.id, queryRunner.manager),
        queryRunner.commitTransaction()
      ])
      return staff
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release()
    }
  }

  async findAll() {
    return await this.staffRepository.find();
  }

  async findOne(id: string) {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  async findOneByUserId(id: string) {
    const staff = await this.staffRepository.findOne({ where: { userId: id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }
  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    const update = this.staffRepository.merge(staff, updateStaffDto);
    return await this.staffRepository.save(update);
  }

  async remove(id: string) {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return await this.staffRepository.remove(staff);
  }
}
