import { PresenceStudentModule } from './presence-student/presence-student.module';
import { StudentsModule } from './students/students.module';
import { Module } from '@nestjs/common';
import { SubjectsModule } from './subjects/subjects.module';
import { CbtModule } from './cbt/cbt.module';

@Module({
    imports: [StudentsModule, PresenceStudentModule, SubjectsModule, CbtModule],
})
export class AcademicModule { }
