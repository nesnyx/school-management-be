import { PartialType } from '@nestjs/mapped-types';
import { CreateELearningDto } from './create-e-learning.dto';

export class UpdateELearningDto extends PartialType(CreateELearningDto) {}
