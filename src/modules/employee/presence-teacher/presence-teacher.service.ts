import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresenceTeacherDto } from './dto/create-presence-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PresenceTeacher } from './entities/presence-teacher.entity';
import { Repository } from 'typeorm';
import { RfidService } from 'src/modules/system-admin/rfid/rfid.service';
import { TeachersService } from '../teachers/teachers.service';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';

@Injectable()
export class PresenceTeacherService {
  constructor(
    @InjectRepository(PresenceTeacher)
    private readonly presenceTeacherRepository: Repository<PresenceTeacher>,
    private readonly rfidService: RfidService,
    private readonly teacherService: TeachersService
  ) { }
  async recordPresence(createPresenceTeacherDto: CreatePresenceTeacherDto) {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentHour = now.getHours();
    const card = await this.rfidService.findRfidCardByrfId(createPresenceTeacherDto.rfid);
    const user = card.user
    if (user.role !== Role.GURU) {
      throw new BadRequestException('Kartu ini bukan milik guru');
    }
    const teacher = await this.teacherService.findOneByUserId(user.id)
    if (!teacher) throw new NotFoundException('Data guru tidak ditemukan');
    let presence = await this.presenceTeacherRepository.findOne({ where: { teacherId: Number(teacher.id), date: today } })
    if (!presence) {
      if (currentHour > 9) {
        throw new BadRequestException('Sudah siang, tidak bisa absen masuk!');
      }
      const newPresence = this.presenceTeacherRepository.create({
        teacherId: Number(teacher.id),
        date: today,
        timeIn: now,
        status: this.calculateStatus(now),
      });
      return await this.presenceTeacherRepository.save(newPresence);
    }
    if (presence.timeOut) {
      throw new BadRequestException('Anda sudah absen pulang hari ini.');
    }

    const diffMs = now.getTime() - new Date(presence.timeIn).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 4) {
      throw new BadRequestException('Guru terlalu cepat untuk absen pulang!');
    }

    if (currentHour < 12) {
      throw new BadRequestException('Guru belum jam pulang sekolah!');
    }

    presence.timeOut = now;
    return await this.presenceTeacherRepository.save(presence);
  }


  async findAll() {
    return await this.presenceTeacherRepository.find();
  }


  private calculateStatus(time: Date): string {
    const limit = new Date();
    limit.setHours(7, 0, 0);
    return time > limit ? 'TERLAMBAT' : 'HADIR';
  }
}
