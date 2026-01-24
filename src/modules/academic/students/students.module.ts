import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { UsersModule } from 'src/modules/system-admin/users/users.module';
import { AccessControlModule } from 'src/modules/system-admin/access-control/access-control.module';



@Module({
  imports: [TypeOrmModule.forFeature([Student]), UsersModule,AccessControlModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule { }
