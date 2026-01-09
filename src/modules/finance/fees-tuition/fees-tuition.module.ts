import { Module } from '@nestjs/common';
import { FeesTuitionService } from './fees-tuition.service';
import { FeesTuitionController } from './fees-tuition.controller';

@Module({
  controllers: [FeesTuitionController],
  providers: [FeesTuitionService],
})
export class FeesTuitionModule {}
