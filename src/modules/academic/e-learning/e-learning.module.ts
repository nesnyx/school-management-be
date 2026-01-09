import { Module } from '@nestjs/common';
import { ELearningService } from './e-learning.service';
import { ELearningController } from './e-learning.controller';

@Module({
  controllers: [ELearningController],
  providers: [ELearningService],
})
export class ELearningModule {}
