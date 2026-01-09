import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { RfidService } from 'src/modules/system-admin/rfid/rfid.service';
import { CreatePresenceStudentDto } from './dto/create-presence-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PresenceStudent } from './entities/presence-student.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/modules/system-admin/users/entities/user.entity';
import { StudentsService } from '../students/students.service';


@Injectable()
export class PresenceStudentService {
  constructor(
    @InjectRepository(PresenceStudent)
    private readonly presenceStudentRepository: Repository<PresenceStudent>,
    private readonly rfidService: RfidService,
    private readonly studentService: StudentsService) {
  }

  async recordPresence(createPresenceStudentDto: CreatePresenceStudentDto) {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentHour = now.getHours();
    const card = await this.rfidService.findRfidCardByrfId(createPresenceStudentDto.rfid);
    const user = card.user
    if (user.role !== Role.SISWA) {
      throw new BadRequestException('Kartu ini bukan milik siswa');
    }
    const student = await this.studentService.findOne(user.id)
    if (!student) throw new NotFoundException('Data siswa tidak ditemukan');
    let presence = await this.presenceStudentRepository.findOne({ where: { studentId: Number(student.id), date: today } })
    if (!presence) {
      if (currentHour > 11) {
        throw new BadRequestException('Sudah siang, tidak bisa absen masuk!');
      }
      const newPresence = this.presenceStudentRepository.create({
        studentId: Number(student.id),
        date: today,
        timeIn: now,
        status: this.calculateStatus(now),
      });
      return await this.presenceStudentRepository.save(newPresence);
    }
    if (presence.timeOut) {
      throw new BadRequestException('Anda sudah absen pulang hari ini.');
    }

    const diffMs = now.getTime() - new Date(presence.timeIn).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 4) {
      throw new BadRequestException('Terlalu cepat untuk absen pulang!');
    }

    if (currentHour < 14) {
      throw new BadRequestException('Belum jam pulang sekolah!');
    }

    presence.timeOut = now;
    return await this.presenceStudentRepository.save(presence);
  }

  private calculateStatus(time: Date): string {
    const limit = new Date();
    limit.setHours(7, 0, 0);
    return time > limit ? 'TERLAMBAT' : 'HADIR';
  }
} 
