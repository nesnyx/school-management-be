import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeesTuitionDto } from './dto/create-fees-tuition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeesTuition } from './entities/fees-tuition.entity';
import { Repository } from 'typeorm';
import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
import { ReferenceType } from '../payment-gateway/entities/payment-gateway.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';

@Injectable()
export class FeesTuitionService {
  constructor(
    @InjectRepository(FeesTuition)
    private feesTuitionRepository: Repository<FeesTuition>,
    private paymentGatewayService: PaymentGatewayService,
    private dataSource: DataSource

  ) { }

  @OnEvent(`payment.updated.${ReferenceType.FEES_TUITION}`, { async: true })
  async handlePaymentUpdated(payload: any) {
    const { referenceId, status, midtransTransactionId, paymentType } = payload;
    const target = await this.feesTuitionRepository.findOne({
      where: { id: referenceId }
    })
    if (target?.status === 'SUCCESS') {
      return;
    }
    await this.feesTuitionRepository.update(referenceId, {
      status: status,
      midtransTransactionId: midtransTransactionId,
      paymentType: paymentType,
    });

  }

  async create(createFeesTuitionDto: CreateFeesTuitionDto) {
    const existingOrder = await this.feesTuitionRepository.findOne({
      where: {
        status: "PENDING"
      }
    })
    if (existingOrder) {
      // Ambil data payment jembatannya
      const existingPayment = await this.paymentGatewayService.getPaymentByReference(
        existingOrder.id
      );

      // Jika sudah ada token Midtrans, kembalikan itu. Jika belum (karena error sebelumnya), buatkan.
      const midtransRes = await this.paymentGatewayService.createTransaction(
        existingPayment.id,
        existingPayment.amount,
        ReferenceType.FEES_TUITION,
      );

      return {
        message: 'Melanjutkan pembayaran sebelumnya',
        midtrans_token: midtransRes.token,
        redirect_url: midtransRes.redirect_url,
      };
    }
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
        payment.id,
        payment.amount,
        ReferenceType.FEES_TUITION
      );


      await queryRunner.commitTransaction();
      await this.paymentGatewayService.update(payment.id, midtransRes.redirect_url, midtransRes.snap_token)
      return {
        midtrans: midtransRes,
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
    const existingFeesTuition = await this.feesTuitionRepository.findOne({ where: { id } });
    if (!existingFeesTuition) {
      throw new NotFoundException("Fees Tuition Not Found")
    }
    return existingFeesTuition
  }

  async findAll() {
    return await this.feesTuitionRepository.find()
  }
}
