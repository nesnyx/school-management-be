import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/modules/system-admin/users/users.service';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private userService: UsersService
  ) { }

  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }

  async create(createStaffDto: CreateStaffDto) {
    const generatedPassword = this.generatePassword();
    const user = await this.userService.create({
      identifier: createStaffDto.username,
      password: generatedPassword,
      role: Role.EMPLOYEE,
    });
    const staff = this.staffRepository.create({
      username: createStaffDto.username,
      fullName: createStaffDto.fullName,
      userId: user.id
    })
    return await this.staffRepository.save(staff);
  }

  async findAll() {
    return await this.staffRepository.find();
  }

  async findOne(id: number) {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  async findOneByUserId(id: number) {
    const staff = await this.staffRepository.findOne({ where: { userId: id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }
  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    const update = this.staffRepository.merge(staff, updateStaffDto);
    return await this.staffRepository.save(update);
  }

  async remove(id: number) {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return await this.staffRepository.remove(staff);
  }
}
