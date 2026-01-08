import { Module } from '@nestjs/common';
import { AdministrationEmployeeService } from './administration-employee.service';
import { AdministrationEmployeeController } from './administration-employee.controller';

@Module({
  controllers: [AdministrationEmployeeController],
  providers: [AdministrationEmployeeService],
})
export class AdministrationEmployeeModule {}
