
import { StudentsModule } from './students/students.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [StudentsModule],

})
export class AcademicModule { }
