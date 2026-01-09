import { PartialType } from '@nestjs/mapped-types';
import { CreateERaportDto } from './create-e-raport.dto';

export class UpdateERaportDto extends PartialType(CreateERaportDto) {}
