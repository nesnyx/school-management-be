import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeesTuition } from '../fees-tuition/entities/fees-tuition.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaymentGateway } from './entities/payment-gateway.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FeesTuition, PaymentGateway]), EventEmitterModule.forRoot()],
  controllers: [PaymentGatewayController],
  providers: [PaymentGatewayService],
  exports: [PaymentGatewayService]
})
export class PaymentGatewayModule { }
