import { Module } from '@nestjs/common';
import { PresenceTeacherService } from './presence-teacher.service';
import { PresenceTeacherController } from './presence-teacher.controller';

@Module({
  controllers: [PresenceTeacherController],
  providers: [PresenceTeacherService],
})
export class PresenceTeacherModule {}
