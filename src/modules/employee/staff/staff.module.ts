import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { UsersModule } from 'src/modules/system-admin/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Staff]), UsersModule],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule { }
