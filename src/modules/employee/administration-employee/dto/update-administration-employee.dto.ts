import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrationEmployeeDto } from './create-administration-employee.dto';

export class UpdateAdministrationEmployeeDto extends PartialType(CreateAdministrationEmployeeDto) {}
