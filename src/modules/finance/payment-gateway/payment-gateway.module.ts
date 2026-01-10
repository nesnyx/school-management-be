import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeesTuition } from '../fees-tuition/entities/fees-tuition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeesTuition])],
  controllers: [PaymentGatewayController],
  providers: [PaymentGatewayService],
  exports: [PaymentGatewayService]
})
export class PaymentGatewayModule { }
