import { PartialType } from '@nestjs/mapped-types';
import { CreateFeesTuitionDto } from './create-fees-tuition.dto';

export class UpdateFeesTuitionDto extends PartialType(CreateFeesTuitionDto) {}
