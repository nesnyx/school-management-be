import { Module } from "@nestjs/common";
import { SalariesModule } from "./salaries/salaries.module";
import { KpiModule } from "./kpi/kpi.module";

@Module({
    imports: [SalariesModule, KpiModule],
})
export class EmployeeModule { }