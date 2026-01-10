import { Module } from "@nestjs/common";
import { SalariesModule } from "./salaries/salaries.module";
import { KpiModule } from "./kpi/kpi.module";
import { SubmissionModule } from './submission/submission.module';
import { TeachersModule } from './teachers/teachers.module';
import { PresenceEmployeeModule } from './presence-employee/presence-employee.module';
import { PresenceTeacherModule } from './presence-teacher/presence-teacher.module';
import { AdministrationEmployeeModule } from "./administration-employee/administration-employee.module";
import { StaffModule } from './staff/staff.module';

@Module({
    imports: [SalariesModule, KpiModule, SubmissionModule, TeachersModule, PresenceEmployeeModule, PresenceTeacherModule, PresenceEmployeeModule, AdministrationEmployeeModule, SubmissionModule, SalariesModule, KpiModule, StaffModule],
})
export class EmployeeModule { }