import { Injectable } from '@nestjs/common';
import { CreateFeesTuitionDto } from './dto/create-fees-tuition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeesTuition } from './entities/fees-tuition.entity';
import { Repository } from 'typeorm';
import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
import { generateOrderId } from 'src/common/helpers/order-id.helper';
import { ReferenceType } from '../payment-gateway/entities/payment-gateway.entity';
import { OnEvent } from '@nestjs/event-emitter';
@Injectable()
export class FeesTuitionService {
  constructor(
    @InjectRepository(FeesTuition)
    private feesTuitionRepository: Repository<FeesTuition>,
    private paymentGatewayService: PaymentGatewayService

  ) { }

  @OnEvent('payment.updated')
  async handlePaymentUpdated(payload: any) {
    const { referenceType, referenceId, status, midtransTransactionId, paymentType } = payload;
    if (referenceType == ReferenceType.FEES_TUITION) {
      await this.feesTuitionRepository.update(referenceId, {
        status: status,
        midtransTransactionId: midtransTransactionId,
        paymentType: paymentType,
      });
    }
    console.log(`Fees Tuition ${referenceId} updated to ${status}`);
  }

  async create(createFeesTuitionDto: CreateFeesTuitionDto) {
    const feesTuition = this.feesTuitionRepository.create({
      ...createFeesTuitionDto,
      invoiceId: this.paymentGatewayService.generateInvoiceNumber(),
      status: 'PENDING',
    });
    const orderId = generateOrderId('FEES');
    const savedOrder = await this.feesTuitionRepository.save(feesTuition);
    const payment = await this.paymentGatewayService.createPayment(
      savedOrder.amount,
      ReferenceType.FEES_TUITION,
      savedOrder.id,
      'PENDING'
    );

    const midtransRes = await this.paymentGatewayService.createTransaction(
      orderId,
      payment.amount
    );
    return {
      message: 'Checkout berhasil',
      data: savedOrder,
      midtrans: midtransRes,
      midtrans_token: midtransRes.token,
      redirect_url: midtransRes.redirect_url
    };
  }

  async findOne(id: number) {
    return await this.feesTuitionRepository.findOne({ where: { id } });
  }
}
