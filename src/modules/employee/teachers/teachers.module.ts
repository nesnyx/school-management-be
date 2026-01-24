import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { UsersModule } from 'src/modules/system-admin/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { AccessControlModule } from 'src/modules/system-admin/access-control/access-control.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Teacher]),AccessControlModule],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService]
})
export class TeachersModule { }
