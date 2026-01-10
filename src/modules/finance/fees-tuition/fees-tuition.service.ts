import { Injectable } from '@nestjs/common';
import { CreateFeesTuitionDto } from './dto/create-fees-tuition.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { FeesTuition } from './entities/fees-tuition.entity';
import { Repository } from 'typeorm';
import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
@Injectable()
export class FeesTuitionService {
  constructor(
    @InjectRepository(FeesTuition)
    private feesTuitionRepository: Repository<FeesTuition>,
    private paymentGatewayService: PaymentGatewayService

  ) { }
  async create(createFeesTuitionDto: CreateFeesTuitionDto) {
    const feesTuition = this.feesTuitionRepository.create({
      ...createFeesTuitionDto,
      invoiceId: this.paymentGatewayService.generateInvoiceNumber(),
      status: 'PENDING',
    });

    const savedOrder = await this.feesTuitionRepository.save(feesTuition);
    const midtransRes = await this.paymentGatewayService.createTransaction(
      savedOrder.id,
      savedOrder.amount
    );
    return {
      message: 'Checkout berhasil',
      data: savedOrder,
      midtrans_token: midtransRes.token,
      redirect_url: midtransRes.redirect_url
    };
  }

  async findOne(id: number) {
    return await this.feesTuitionRepository.findOne({ where: { id } });
  }
}
