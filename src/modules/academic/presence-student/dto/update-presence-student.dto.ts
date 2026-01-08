import { PartialType } from '@nestjs/mapped-types';
import { CreatePresenceStudentDto } from './create-presence-student.dto';

export class UpdatePresenceStudentDto extends PartialType(CreatePresenceStudentDto) {}
