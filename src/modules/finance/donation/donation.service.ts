import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
import { ReferenceType } from '../payment-gateway/entities/payment-gateway.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';


@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    private paymentGatewayService: PaymentGatewayService,
    private dataSource: DataSource
  ) { }


  @OnEvent('payment.updated', { async: true })
  async handlePaymentUpdated(payload: any) {
    const { referenceType, referenceId, status, midtransTransactionId, paymentType } = payload;
    if (referenceType === ReferenceType.DONATION) {
      await this.donationRepository.update(referenceId, {
        status: status,
        midtransTransactionId: midtransTransactionId,
        paymentType: paymentType,
      });
    }
    console.log(`[Queue/Event] Donation ${referenceId} updated to ${status}`);
  }

  async create(createDonationDto: CreateDonationDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const donation = queryRunner.manager.create(Donation, {
        amount: createDonationDto.amount,
        status: 'PENDING'
      });
      const savedDonation = await queryRunner.manager.save(donation);

      const payment = await this.paymentGatewayService.createPayment(createDonationDto.amount, ReferenceType.DONATION, savedDonation.id, 'PENDING', queryRunner.manager);

      const midtransRes = await this.paymentGatewayService.createTransaction(savedDonation.id, payment.amount, ReferenceType.DONATION)

      await queryRunner.commitTransaction();
      return {
        message: 'Donation berhasil',
        data: savedDonation,
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


}
