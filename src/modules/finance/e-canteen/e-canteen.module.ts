import { Module } from '@nestjs/common';
import { ECanteenService } from './e-canteen.service';
import { ECanteenController } from './e-canteen.controller';

@Module({
  controllers: [ECanteenController],
  providers: [ECanteenService],
})
export class ECanteenModule {}
