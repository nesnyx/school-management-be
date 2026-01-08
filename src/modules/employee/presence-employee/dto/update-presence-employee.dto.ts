import { PartialType } from '@nestjs/mapped-types';
import { CreatePresenceEmployeeDto } from './create-presence-employee.dto';

export class UpdatePresenceEmployeeDto extends PartialType(CreatePresenceEmployeeDto) {}
