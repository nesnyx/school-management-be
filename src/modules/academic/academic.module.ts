
import { PresenceStudentModule } from './presence-student/presence-student.module';
import { StudentsModule } from './students/students.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [StudentsModule, PresenceStudentModule],

})
export class AcademicModule { }
