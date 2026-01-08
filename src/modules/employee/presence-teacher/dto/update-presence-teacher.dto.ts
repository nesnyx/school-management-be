import { PartialType } from '@nestjs/mapped-types';
import { CreatePresenceTeacherDto } from './create-presence-teacher.dto';

export class UpdatePresenceTeacherDto extends PartialType(CreatePresenceTeacherDto) {}
