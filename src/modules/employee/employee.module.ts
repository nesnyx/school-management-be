import { Module } from "@nestjs/common";
import { SalariesModule } from "./salaries/salaries.module";
import { KpiModule } from "./kpi/kpi.module";
import { SubmissionModule } from './submission/submission.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
    imports: [SalariesModule, KpiModule, SubmissionModule, TeachersModule],
})
export class EmployeeModule { }