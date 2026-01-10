import { Module } from '@nestjs/common';
import { PresenceEmployeeService } from './presence-employee.service';
import { PresenceEmployeeController } from './presence-employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceEmployee } from './entities/presence-employee.entity';
import { RfidModule } from 'src/modules/system-admin/rfid/rfid.module';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [RfidModule, StaffModule, TypeOrmModule.forFeature([PresenceEmployee])],
  controllers: [PresenceEmployeeController],
  providers: [PresenceEmployeeService],
})
export class PresenceEmployeeModule { }
