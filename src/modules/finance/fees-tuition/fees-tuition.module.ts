import { Module } from '@nestjs/common';
import { FeesTuitionService } from './fees-tuition.service';
import { FeesTuitionController } from './fees-tuition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeesTuition } from './entities/fees-tuition.entity';
import { PaymentGatewayModule } from '../payment-gateway/payment-gateway.module';

@Module({
  controllers: [FeesTuitionController],
  providers: [FeesTuitionService],
  imports: [TypeOrmModule.forFeature([FeesTuition]), PaymentGatewayModule],
  exports: [FeesTuitionService]
})
export class FeesTuitionModule { }
