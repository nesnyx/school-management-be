import { PartialType } from '@nestjs/mapped-types';
import { CreateECanteenDto } from './create-e-canteen.dto';

export class UpdateECanteenDto extends PartialType(CreateECanteenDto) {}
