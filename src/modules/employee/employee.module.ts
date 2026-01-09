import { Module } from "@nestjs/common";
import { SalariesModule } from "./salaries/salaries.module";
import { KpiModule } from "./kpi/kpi.module";
import { SubmissionModule } from './submission/submission.module';

@Module({
    imports: [SalariesModule, KpiModule, SubmissionModule],
})
export class EmployeeModule { }