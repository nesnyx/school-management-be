import { Module } from '@nestjs/common';
import { PresenceTeacherService } from './presence-teacher.service';
import { PresenceTeacherController } from './presence-teacher.controller';
import { RfidModule } from 'src/modules/system-admin/rfid/rfid.module';
import { TeachersModule } from '../teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceTeacher } from './entities/presence-teacher.entity';

@Module({
  imports: [RfidModule, TeachersModule, TypeOrmModule.forFeature([PresenceTeacher])],
  controllers: [PresenceTeacherController],
  providers: [PresenceTeacherService],
})
export class PresenceTeacherModule { }
