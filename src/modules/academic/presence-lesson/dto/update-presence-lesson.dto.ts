import { PartialType } from '@nestjs/mapped-types';
import { CreatePresenceLessonDto } from './create-presence-lesson.dto';

export class UpdatePresenceLessonDto extends PartialType(CreatePresenceLessonDto) {}
