import { Module } from '@nestjs/common';
import { PunishmentService } from './punishment.service';
import { PunishmentController } from './punishment.controller';

@Module({
  controllers: [PunishmentController],
  providers: [PunishmentService],
})
export class PunishmentModule {}
