import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { PaymentGatewayModule } from '../payment-gateway/payment-gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), PaymentGatewayModule],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService]
})
export class DonationModule { }
