import { Module } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { RfidController } from './rfid.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rfid } from './entities/rfid.entity';
import { RfidCard } from './entities/rfid-cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rfid, RfidCard]), UsersModule],
  controllers: [RfidController],
  providers: [RfidService],
  exports: [RfidService]
})
export class RfidModule { }
