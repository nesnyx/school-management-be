import { Module } from '@nestjs/common';
import { PresenceStudentService } from './presence-student.service';
import { PresenceStudentController } from './presence-student.controller';
import { RfidModule } from 'src/modules/system-admin/rfid/rfid.module';
import { StudentsModule } from '../students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceStudent } from './entities/presence-student.entity';
import { AccessControlModule } from 'src/modules/system-admin/access-control/access-control.module';

@Module({
  imports: [TypeOrmModule.forFeature([PresenceStudent]), RfidModule, StudentsModule,AccessControlModule],
  controllers: [PresenceStudentController],
  providers: [PresenceStudentService],
})
export class PresenceStudentModule { }
