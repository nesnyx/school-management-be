import { Injectable } from '@nestjs/common';
import { CreateFeesTuitionDto } from './dto/create-fees-tuition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeesTuition } from './entities/fees-tuition.entity';
import { Repository } from 'typeorm';
import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
import { ReferenceType } from '../payment-gateway/entities/payment-gateway.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class FeesTuitionService {
  constructor(
    @InjectRepository(FeesTuition)
    private feesTuitionRepository: Repository<FeesTuition>,
    private paymentGatewayService: PaymentGatewayService,
    private dataSource: DataSource

  ) { }

  @OnEvent('payment.updated', { async: true })
  async handlePaymentUpdated(payload: any) {
    const { referenceType, referenceId, status, midtransTransactionId, paymentType } = payload;
    if (referenceType === ReferenceType.FEES_TUITION) {
      await this.feesTuitionRepository.update(referenceId, {
        status: status,
        midtransTransactionId: midtransTransactionId,
        paymentType: paymentType,
      });
      console.log(`[Queue/Event] FeesTuition ${referenceId} updated to ${status}`);
    }
  }

  async create(createFeesTuitionDto: CreateFeesTuitionDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const feesTuition = queryRunner.manager.create(FeesTuition, {
        ...createFeesTuitionDto,
        invoiceId: this.paymentGatewayService.generateInvoiceNumber(),
        status: 'PENDING',
      });
      const savedOrder = await queryRunner.manager.save(feesTuition);
      const payment = await this.paymentGatewayService.createPayment(
        savedOrder.amount,
        ReferenceType.FEES_TUITION,
        savedOrder.id,
        'PENDING',
        queryRunner.manager,
      );
      const midtransRes = await this.paymentGatewayService.createTransaction(
        savedOrder.id,
        payment.amount,
        ReferenceType.FEES_TUITION
      );
      await queryRunner.commitTransaction();
      return {
        message: 'Checkout Fees Tuition berhasil',
        data: savedOrder,
        midtrans_token: midtransRes.token,
        redirect_url: midtransRes.redirect_url
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string) {
    return await this.feesTuitionRepository.findOne({ where: { id } });
  }
}
