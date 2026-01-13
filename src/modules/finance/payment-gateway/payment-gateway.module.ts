import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


import { PaymentGateway } from './entities/payment-gateway.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PaymentGateway])],
  controllers: [PaymentGatewayController],
  providers: [PaymentGatewayService],
  exports: [PaymentGatewayService]
})
export class PaymentGatewayModule { }
