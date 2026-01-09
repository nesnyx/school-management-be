import { Module } from '@nestjs/common';
import { PresenceStudentService } from './presence-student.service';
import { PresenceStudentController } from './presence-student.controller';

@Module({
  controllers: [PresenceStudentController],
  providers: [PresenceStudentService],
})
export class PresenceStudentModule { }
