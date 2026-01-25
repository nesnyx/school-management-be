import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { UsersModule } from '../system-admin/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { AccessControlModule } from '../system-admin/access-control/access-control.module';
import { StudentParent } from './entities/student-parent.entity';
import { StudentsModule } from '../academic/students/students.module';

@Module({
  imports: [UsersModule,StudentsModule, TypeOrmModule.forFeature([Parent,StudentParent]),AccessControlModule],
  controllers: [ParentsController],
  providers: [ParentsService],
  exports: [ParentsService]
})
export class ParentsModule { }
