import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


import { PaymentGateway } from './entities/payment-gateway.entity';
import { BullModule } from '@nestjs/bullmq';
import { PaymentProcessor } from './payment-gateway.processor';
@Module({
  imports: [BullModule.registerQueue({
    name: 'payment-queue'
  }), TypeOrmModule.forFeature([PaymentGateway])],
  controllers: [PaymentGatewayController],
  providers: [PaymentGatewayService, PaymentProcessor],
  exports: [PaymentGatewayService]
})
export class PaymentGatewayModule { }
