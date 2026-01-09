import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresenceEmployeeDto } from './dto/create-presence-employee.dto';
import { RfidService } from 'src/modules/system-admin/rfid/rfid.service';
import { StaffService } from '../staff/staff.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PresenceEmployee } from './entities/presence-employee.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';

@Injectable()
export class PresenceEmployeeService {
  constructor(
    @InjectRepository(PresenceEmployee)
    private readonly presenceEmployeeRepository: Repository<PresenceEmployee>,
    private readonly rfidService: RfidService,
    private readonly staffService: StaffService
  ) { }
  async recordPresence(createPresenceEmployeeDto: CreatePresenceEmployeeDto) {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentHour = now.getHours();
    const card = await this.rfidService.findRfidCardByrfId(createPresenceEmployeeDto.rfid);
    const user = card.user
    if (user.role !== Role.EMPLOYEE) {
      throw new BadRequestException('Kartu ini bukan milik staf');
    }
    const staff = await this.staffService.findOneByUserId(user.id)
    if (!staff) throw new NotFoundException('Data staf tidak ditemukan');
    let presence = await this.presenceEmployeeRepository.findOne({ where: { staffId: Number(staff.id), date: today } })
    if (!presence) {
      if (currentHour > 9) {
        throw new BadRequestException('Sudah siang, tidak bisa absen masuk!');
      }
      const newPresence = this.presenceEmployeeRepository.create({
        staffId: Number(staff.id),
        date: today,
        timeIn: now,
        status: this.calculateStatus(now),
      });
      return await this.presenceEmployeeRepository.save(newPresence);
    }
    if (presence.timeOut) {
      throw new BadRequestException('Anda sudah absen pulang hari ini.');
    }

    const diffMs = now.getTime() - new Date(presence.timeIn).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 5) {
      throw new BadRequestException('Staf terlalu cepat untuk absen pulang!');
    }

    if (currentHour < 13) {
      throw new BadRequestException('Staf belum jam pulang sekolah!');
    }

    presence.timeOut = now;
    return await this.presenceEmployeeRepository.save(presence);
  }


  private calculateStatus(time: Date): string {
    const limit = new Date();
    limit.setHours(8, 0, 0);
    return time > limit ? 'TERLAMBAT' : 'HADIR';
  }
}
