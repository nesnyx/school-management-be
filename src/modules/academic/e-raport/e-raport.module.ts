import { Module } from '@nestjs/common';
import { ERaportService } from './e-raport.service';
import { ERaportController } from './e-raport.controller';

@Module({
  controllers: [ERaportController],
  providers: [ERaportService],
})
export class ERaportModule {}
