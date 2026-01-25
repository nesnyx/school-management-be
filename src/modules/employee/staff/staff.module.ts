import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { UsersModule } from 'src/modules/system-admin/users/users.module';
import { AccessControlModule } from 'src/modules/system-admin/access-control/access-control.module';

@Module({
  imports: [TypeOrmModule.forFeature([Staff]), UsersModule,AccessControlModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService]
})
export class StaffModule { }
