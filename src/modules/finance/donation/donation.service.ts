import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
import { ReferenceType } from '../payment-gateway/entities/payment-gateway.entity';
import { OnEvent } from '@nestjs/event-emitter';


@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    private paymentGatewayService: PaymentGatewayService
  ) { }


  @OnEvent('payment.updated', { async: true })
  async handlePaymentUpdated(payload: any) {
    try {
      const { referenceType, referenceId, status, midtransTransactionId, paymentType } = payload;
      if (referenceType === ReferenceType.DONATION) {
        await this.donationRepository.update(referenceId, {
          status: status,
          midtransTransactionId: midtransTransactionId,
          paymentType: paymentType,
        });
      }
    } catch (error) {
    }
  }

  async create(createDonationDto: CreateDonationDto) {
    const donation = this.donationRepository.create({
      amount: createDonationDto.amount,
      status: 'PENDING'
    });
    const savedDonation = await this.donationRepository.save(donation);

    const payment = await this.paymentGatewayService.createPayment(createDonationDto.amount, ReferenceType.DONATION, savedDonation.id, 'PENDING');

    const midtransRes = await this.paymentGatewayService.createTransaction(savedDonation.id, payment.amount, ReferenceType.DONATION)

    return {
      message: 'Donation berhasil',
      data: savedDonation,
      midtrans_token: midtransRes.token,
      redirect_url: midtransRes.redirect_url
    };

  }


}
