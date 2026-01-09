import { Module } from '@nestjs/common';
import { PresenceStudentService } from './presence-student.service';
import { PresenceStudentController } from './presence-student.controller';
import { RfidModule } from 'src/modules/system-admin/rfid/rfid.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [RfidModule, StudentsModule],
  controllers: [PresenceStudentController],
  providers: [PresenceStudentService],
})
export class PresenceStudentModule { }
