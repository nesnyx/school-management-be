import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrationLessonDto } from './create-administration-lesson.dto';

export class UpdateAdministrationLessonDto extends PartialType(CreateAdministrationLessonDto) {}
