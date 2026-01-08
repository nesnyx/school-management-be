import { Module } from '@nestjs/common';
import { PresenceEmployeeService } from './presence-employee.service';
import { PresenceEmployeeController } from './presence-employee.controller';

@Module({
  controllers: [PresenceEmployeeController],
  providers: [PresenceEmployeeService],
})
export class PresenceEmployeeModule {}
